import React from "react";
import { useNavigate } from "react-router-dom";
import tic from "../assets/tic-tac-toe.png";
import rock from "../assets/rock-paper-scissors.png";
import memory from "../assets/memory-game.png";
import onlinetic from "../assets/online-tic.png";


export default function Games() {
  const navigate = useNavigate();

  const games = [
    { name: "Tic Tac Toe", img: tic },
    { name: "Rock Paper Scissors", img: rock },
  
    {name:"Mind Game" , img: memory},
    { name: "Online Tic", img: onlinetic },
    
    
  ];

  return (
    <div className="games-page">
      <h1 className="games-title">🕹️ Choose Your Game</h1>

      <div className="games-grid">
        {games.map((game) => (
          <div key={game.name} className="game-card">
            <img src={game.img} alt={game.name} />
            <h3>{game.name}</h3>
            <button onClick={() => navigate(`/game/${game.name}`)}>
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
