import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function GameComing() {
  const { name } = useParams();
  const navigate = useNavigate();

  return (
    <div className="coming-page">
      <h1>{name}</h1>
      <p>🚧 Coming Soon 🚧</p>
      <button onClick={() => navigate("/games")}>⬅ Back to Games</button>
    </div>
  );
}
