import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameComing from "./pages/GameComing";
import RockPaperScissors from "./pages/RockPaperScissors";
import TicTacToe from "./pages/TicTacToe";
import DiceGame from "./pages/DiceGame";
import OnlineTic from "./pages/OnlineTic"
import MemoryGame from "./pages/MindGame";

export default function App() {
  return (
    <Routes>
   
    
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<Games />} />
      {/* <Route path="/game/:name" element={<GameComing />} /> */}
      <Route path="/game/Rock Paper Scissors" element={<RockPaperScissors />} />
      <Route path="/game/Tic Tac Toe" element={<TicTacToe />} />
      <Route path="/game/Dice Game" element={<DiceGame />} />
      <Route path="/game/Mind Game" element={ <MemoryGame/>} />
      <Route path="/game/Online Tic" element={<OnlineTic />} />
    </Routes>
  );
}
