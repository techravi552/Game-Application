import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/DiceGame.css";

export default function DiceGame() {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [sum, setSum] = useState(2);
  const navigate = useNavigate();

  const rollDice = () => {
    const newDice1 = Math.floor(Math.random() * 6) + 1;
    const newDice2 = Math.floor(Math.random() * 6) + 1;
    setDice1(newDice1);
    setDice2(newDice2);
    setSum(newDice1 + newDice2);
  };

  return (
    <div className="dice-container">
      {/* 🔙 Home Button */}
      <button className="home-btn" onClick={() => navigate("/")}>
        ⬅️ Home
      </button>

      <h1 className="title">🎲 Dice Rolling Game</h1>

      <div className="dice-board">
        <img src={`/dice/dice${dice1}.png`} alt={`Dice ${dice1}`} className="dice" />
        <img src={`/dice/dice${dice2}.png`} alt={`Dice ${dice2}`} className="dice" />
      </div>

      <h2 className="sum">Sum: {sum}</h2>

      <button className="roll-btn" onClick={rollDice}>
        Roll Dice 🎲
      </button>
    </div>
  );
}
