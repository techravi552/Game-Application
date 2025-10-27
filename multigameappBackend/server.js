const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 5000;

// In-memory rooms
const rooms = {};

// Helper: random room ID
function makeRoomId() {
  return Math.random().toString(36).substring(2, 8);
}

// Check winner
function checkWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (board.every(cell => cell !== null)) return "draw";
  return null;
}

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("createRoom", () => {
    const roomId = makeRoomId();
    rooms[roomId] = {
      id: roomId,
      players: [socket.id],
      board: Array(9).fill(null),
      currentTurn: "X",
      symbols: { [socket.id]: "X" },
      moves: { [socket.id]: [] } // track moves
    };
    socket.join(roomId);
    socket.emit("roomCreated", { roomId, symbol: "X" });
  });

  socket.on("joinRoom", ({ roomId }) => {
    const room = rooms[roomId];
    if (!room || room.players.length >= 2) {
      socket.emit("errorMessage", "Room does not exist or full.");
      return;
    }

    room.players.push(socket.id);
    room.symbols[socket.id] = "O";
    room.moves[socket.id] = [];
    socket.join(roomId);

    room.players.forEach(pid => {
      io.to(pid).emit("yourSymbol", { symbol: room.symbols[pid] });
    });

    io.to(roomId).emit("gameStarted", { board: room.board, currentTurn: room.currentTurn });
  });

  socket.on("makeMove", ({ roomId, index }) => {
    const room = rooms[roomId];
    if (!room) return;
    const symbol = room.symbols[socket.id];
    if (!symbol || room.currentTurn !== symbol || room.board[index] !== null) return;

    // Apply current move
    room.board[index] = symbol;
    const myMoves = room.moves[socket.id];
    if (myMoves.length === 3) myMoves.shift();
    myMoves.push(index);

    // Check win BEFORE removing opponent's move
    const winner = checkWinner(room.board);
    if (winner) {
      io.to(roomId).emit("gameOver", { result: winner==="draw"?"draw":"win", winner, board: room.board });
      return;
    }

    // Remove opponent's oldest move if they have 3 moves
    const opponentId = room.players.find(pid => pid !== socket.id);
    if(opponentId && room.moves[opponentId].length === 3){
      const removedIndex = room.moves[opponentId].shift();
      room.board[removedIndex] = null;
    }

    // Switch turn
    room.currentTurn = opponentId ? room.symbols[opponentId] : symbol;

    io.to(roomId).emit("updateBoard", { board: room.board, currentTurn: room.currentTurn });
  });

  socket.on("restartGame", ({ roomId }) => {
    const room = rooms[roomId];
    if (!room) return;

    room.board = Array(9).fill(null);
    room.currentTurn = "X";
    room.moves = {};
    room.players.forEach(pid => room.moves[pid] = []);
    io.to(roomId).emit("gameRestarted", { board: room.board, currentTurn: room.currentTurn });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    for(const rId in rooms){
      const room = rooms[rId];
      if(room.players.includes(socket.id)){
        room.players = room.players.filter(p => p !== socket.id);
        delete room.symbols[socket.id];
        delete room.moves[socket.id];
        if(room.players.length === 1){
          io.to(room.players[0]).emit("opponentLeft", { message: "Opponent disconnected." });
        } else if(room.players.length === 0){
          delete rooms[rId];
        }
      }
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
