import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import hero1 from "../assets/tic-tac-toe.png";
import hero2 from "../assets/rock-paper-scissors.png";
import hero3 from "../assets/memory-game.png";
import hero4 from "../assets/online-tic.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      {/* Animated Gradient Background */}
      <div className="animated-bg"></div>

      {/* Floating colorful circles */}
      <div className="floating-circle circle1"></div>
      <div className="floating-circle circle2"></div>
      <div className="floating-circle circle3"></div>

      {/* Main content */}
      <div className="hero-content">
        <h1 className="neon-title">🎮 GAME WORLD</h1>
        <p className="hero-tagline">Fun • Logic • Challenge</p>

        {/* Floating Game Icons */}
        <div className="game-icons">
          <img src={hero1} alt="Tic Tac Toe" className="float-img img1" />
          <img src={hero2} alt="Rock Paper Scissors" className="float-img img2" />
          <img src={hero3} alt="Memory Game" className="float-img img3" />
          <img src={hero4} alt="online tic Game" className="float-img img3" />
        </div>

        {/* Button */}
        <button className="play-now" onClick={() => navigate("/games")}>
          🚀 Multipale Game
        </button>
      </div>
    </div>
  );
}
