import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/TicTacToe.css";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const navigate = useNavigate();

  const handleClick = (index) => {
    if (board[index] || winner) return; // if already filled or game ended
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        return;
      }
    }
    if (!squares.includes(null)) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="ttt-container">
      {/* 🔙 Home Button */}
      <button className="home-btn" onClick={() => navigate("/")}>
        ⬅️ Home
      </button>

      <h1 className="title">❌ Tic Tac Toe ⭕</h1>

      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>

      <h2 className="status">
        {winner
          ? winner === "Draw"
            ? "😐 It's a Draw!"
            : `🎉 Winner: ${winner}`
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </h2>

      <button className="reset-btn" onClick={resetGame}>
        🔄 Restart
      </button>
    </div>
  );
}
