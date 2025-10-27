import React from 'react';

export default function DifficultyScreen({ onSelectDifficulty }) {
  return (
    <div className="difficulty-screen">
      <div className="header">
        <h1>🎮 MEMORY GAME</h1>
        <p>Difficulty Level Select Kro!</p>
      </div>
      <div className="difficulty-buttons">
        <button 
          className="difficulty-btn easy-btn" 
          onClick={() => onSelectDifficulty('easy')}
        >
          <span className="difficulty-level">EASY</span>
          <span className="difficulty-cards">8 Cards</span>
        </button>
        <button 
          className="difficulty-btn medium-btn" 
          onClick={() => onSelectDifficulty('medium')}
        >
          <span className="difficulty-level">MEDIUM</span>
          <span className="difficulty-cards">12 Cards</span>
        </button>
        <button 
          className="difficulty-btn hard-btn" 
          onClick={() => onSelectDifficulty('hard')}
        >
          <span className="difficulty-level">HARD</span>
          <span className="difficulty-cards">16 Cards</span>
        </button>
      </div>
    </div>
  );
}