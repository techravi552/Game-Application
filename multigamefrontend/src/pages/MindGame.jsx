import React, { useState, useEffect } from 'react';
import '../styles/MindGame.css';
import { useNavigate } from "react-router-dom";

export default function MemoryGame() {
  const allEmojis = ['🎮', '🎨', '🎭', '🎪', '🎸', '🎯', '🏀', '🎲', '🎳', '🎰', '🎱', '🎴'];
  
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [showDifficultyScreen, setShowDifficultyScreen] = useState(true);
    const navigate = useNavigate();

  const startGame = (level) => {
    setDifficulty(level);
    setShowDifficultyScreen(false);
    
    let emojiCount;
    if (level === 'easy') emojiCount = 4;
    else if (level === 'medium') emojiCount = 6;
    else emojiCount = 12;
    
    const selectedEmojis = allEmojis.slice(0, emojiCount);
    const emojis = [...selectedEmojis, ...selectedEmojis];
    const shuffled = emojis.sort(() => Math.random() - 0.5);
    
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
    setTime(0);
    setGameStarted(true);
  };

  const resetGame = () => {
    setShowDifficultyScreen(true);
    setDifficulty(null);
    setGameStarted(false);
  };

  // Initialize game
  useEffect(() => {
    // Don't auto-start, wait for difficulty selection
  }, []);

  // Timer
  useEffect(() => {
    let interval;
    if (gameStarted && !gameWon) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  // Check for match
  useEffect(() => {
    if (flipped.length === 2) {
      if (cards[flipped[0]] === cards[flipped[1]]) {
        setMatched([...matched, flipped[0], flipped[1]]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
      setMoves(moves + 1);
    }
  }, [flipped]);

  // Check for win
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matched]);

  const initializeGame = () => {
    const shuffled = [...emojis].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
    setTime(0);
    setGameStarted(true);
  };

  const handleCardClick = (index) => {
    if (gameWon || flipped.includes(index) || matched.includes(index)) return;
    if (flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (

    <>
     <div className="ttt-container">
      {/* 🔙 Home Button */}
      <button className="home-btn" onClick={() => navigate("/")}>
        ⬅️ Home
      </button>
    
  
    <div className="app-container">
      <div className="game-wrapper">
        {showDifficultyScreen ? (
          <div className="difficulty-screen">
            <div className="header">
              <h1>🎮 MEMORY GAME</h1>
              <p>Select the Difficulty Level !</p>
            </div>
            <div className="difficulty-buttons">
              <button className="difficulty-btn easy-btn" onClick={() => startGame('easy')}>
                <span className="difficulty-level">EASY</span>
                <span className="difficulty-cards">8 Cards</span>
              </button>
              <button className="difficulty-btn medium-btn" onClick={() => startGame('medium')}>
                <span className="difficulty-level">MEDIUM</span>
                <span className="difficulty-cards">12 Cards</span>
              </button>
              <button className="difficulty-btn hard-btn" onClick={() => startGame('hard')}>
                <span className="difficulty-level">HARD</span>
                <span className="difficulty-cards">16 Cards</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="header">
              <h1>🎮 MEMORY GAME</h1>
              <p>Difficulty: <strong>{difficulty?.toUpperCase()}</strong> | Find emojis and match pairs!</p>
            </div>

            {/* Stats */}
            <div className="stats">
              <div className="stat-box">
                <div className="stat-label">Moves</div>
                <div className="stat-value">{moves}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Time</div>
                <div className="stat-value">{formatTime(time)}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Matched</div>
                <div className="stat-value">{matched.length / 2}/{cards.length / 2}</div>
              </div>
            </div>

            {/* Game Board */}
            <div className="game-board">
              <div className={`cards-grid cards-grid-${difficulty}`}>
                {cards.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleCardClick(index)}
                    className={`card ${
                      flipped.includes(index) || matched.includes(index) ? 'flipped' : ''
                    } ${matched.includes(index) ? 'matched' : ''}`}
                  >
                    {flipped.includes(index) || matched.includes(index) ? emoji : '?'}
                  </button>
                ))}
              </div>
            </div>

            {/* Win Screen */}
            {gameWon && (
              <div className="win-screen">
                <h2>🎉 Congrats! 🎉</h2>
                <p>
                  You complete the game in {formatTime(time)} with {moves} moves!
                </p>
                <button
                  onClick={resetGame}
                  className="btn btn-replay"
                >
                  Play again 🔄
                </button>
              </div>
            )}

            {/* Buttons */}
            {!gameWon && (
              <div className="button-container">
                <button
                  onClick={() => startGame(difficulty)}
                  className="btn btn-new"
                >
                  Restart 🔄
                </button>
                <button
                  onClick={resetGame}
                  className="btn btn-menu"
                >
                  Menu 🏠
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </div>
      </>
  );
}