import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/RockPaperScissors.css";

export default function RockPaperScissors() {
  const [yourChoice, setYourChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const choices = ["rock", "paper", "scissors"];

  const handleClick = (choice) => {
    const randomChoice = choices[Math.floor(Math.random() * 3)];
    setYourChoice(choice);
    setComputerChoice(randomChoice);

    if (choice === randomChoice) {
      setResult("DRAW 😐");
    } else if (
      (choice === "rock" && randomChoice === "scissors") ||
      (choice === "paper" && randomChoice === "rock") ||
      (choice === "scissors" && randomChoice === "paper")
    ) {
      setResult("YOU WIN 😄🎉");
    } else {
      setResult("YOU LOSE 😢💔");
    }
  };

  return (
    <div className="rps-container">
      {/* 🔙 Home Button */}
      <button className="home-btn" onClick={() => navigate("/")}>
        ⬅️ Home
      </button>

      <h1 className="title">✊✋✌️ Rock Paper Scissors</h1>

      <div className="choice-board">
        <h2>
          Computer: <span>{computerChoice}</span>
        </h2>
        <h2>
          You: <span>{yourChoice}</span>
        </h2>
      </div>

      <div className="buttons">
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleClick(choice)}>
            {choice.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="result">
        <h2>
          Result: <span>{result}</span>
        </h2>
      </div>
    </div>
  );
}
