import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "../styles/OnlineTic.css";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000"); // change Render URL

function OnlineTic() {
  const [roomInput, setRoomInput] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [mySymbol, setMySymbol] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [status, setStatus] = useState("Not connected");
  const [gameOver, setGameOver] = useState(false);
    const navigate = useNavigate();

  useEffect(() => {
    socket.on("roomCreated", ({ roomId, symbol }) => {
      setRoomId(roomId);
      setMySymbol(symbol);
      setStatus("Waiting for opponent...");
    });

    socket.on("yourSymbol", ({ symbol }) => setMySymbol(symbol));

    socket.on("gameStarted", ({ board, currentTurn }) => {
      setBoard(board);
      setCurrentTurn(currentTurn);
      setStatus(currentTurn === mySymbol ? "Your turn" : "Opponent's turn");
      setGameOver(false);
    });

    socket.on("updateBoard", ({ board, currentTurn }) => {
      setBoard(board);
      setCurrentTurn(currentTurn);
      setStatus(currentTurn === mySymbol ? "Your turn" : "Opponent's turn");
    });

    socket.on("gameOver", ({ result, winner, board }) => {
      setBoard(board);
      setGameOver(true);
      if(result === "draw") setStatus("Draw!");
      else setStatus(winner === mySymbol ? "You won!" : "You lost!");
    });

    socket.on("gameRestarted", ({ board, currentTurn }) => {
      setBoard(board);
      setCurrentTurn(currentTurn);
      setStatus(currentTurn === mySymbol ? "Your turn" : "Opponent's turn");
      setGameOver(false);
    });

    socket.on("opponentLeft", ({ message }) => setStatus("Opponent left the game."));
    socket.on("errorMessage", msg => setStatus(msg));

    return () => socket.off();
  }, [mySymbol]);

  const handleCreate = () => socket.emit("createRoom");
  const handleJoin = () => {
    if(!roomInput) return alert("Enter room ID");
    setStatus("Joining...");
    socket.emit("joinRoom", { roomId: roomInput });
    setRoomId(roomInput);
  };

  const handleCellClick = (index) => {
    if(!roomId || !mySymbol || gameOver || currentTurn !== mySymbol || board[index]) return;
    socket.emit("makeMove", { roomId, index });
  };

  const handleRestart = () => {
    if(!roomId) return;
    socket.emit("restartGame", { roomId });
  };

  return (
    <>
    <div className="ttt-container">
      {/* 🔙 Home Button */}
      <button className="home-btn" onClick={() => navigate("/")}>
        ⬅️ Home
      </button>
      
    <div className="app">
      <h1>Tic Tac Toe - Online </h1>
      {!roomId ? (
        <div className="controls">
          <button onClick={handleCreate}>Create Room</button>
          <input placeholder="Room ID to join" value={roomInput} onChange={e => setRoomInput(e.target.value)} />
          <button onClick={handleJoin}>Join Room</button>
          <div className="status">{status}</div>
        </div>
      ) : (
        <div className="dashboard">
          <div className="roomid">Room Code: {roomId}</div>
          <div>Your Symbol: {mySymbol}</div>
          <div className="status">{status}</div>
          {gameOver && <button onClick={handleRestart} className="resetbutton">Restart</button>}
          <div className="board">
            {board.map((cell, idx) => (
              <div key={idx} className={`cell ${cell?"filled":""} ${currentTurn!==mySymbol||gameOver?"disabled":""}`} onClick={()=>handleCellClick(idx)}>
                {cell}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
    </>
  );
}

export default OnlineTic;
