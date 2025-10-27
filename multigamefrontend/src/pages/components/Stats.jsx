import React from 'react';

export default function Stats({ moves, time, matched, totalCards }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
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
        <div className="stat-value">{matched}/{totalCards}</div>
      </div>
    </div>
  );
}