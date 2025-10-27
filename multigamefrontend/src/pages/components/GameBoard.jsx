import React from 'react';

export default function GameBoard({ cards, flipped, matched, difficulty, onCardClick }) {
  return (
    <div className="game-board">
      <div className={`cards-grid cards-grid-${difficulty}`}>
        {cards.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onCardClick(index)}
            className={`card ${
              flipped.includes(index) || matched.includes(index) ? 'flipped' : ''
            } ${matched.includes(index) ? 'matched' : ''}`}
          >
            {flipped.includes(index) || matched.includes(index) ? emoji : '?'}
          </button>
        ))}
      </div>
    </div>
  );
}