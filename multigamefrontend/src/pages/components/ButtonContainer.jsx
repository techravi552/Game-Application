import React from 'react';

export default function ButtonContainer({ onRestart, onMenu }) {
  return (
    <div className="button-container">
      <button onClick={onRestart} className="btn btn-new">
        Restart 🔄
      </button>
      <button onClick={onMenu} className="btn btn-menu">
        Menu 🏠
      </button>
    </div>
  );
}