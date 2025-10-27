import React from 'react';

export default function WinScreen({ moves, time, onPlayAgain }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="win-screen">
      <h2>🎉 Congrats! 🎉</h2>
      <p>
        Aapne {moves} moves mein {formatTime(time)} mein game khatam kiya!
      </p>
      <button onClick={onPlayAgain} className="btn btn-replay">
        Phir se Khelo 🔄
      </button>
    </div>
  );
}