import React from "react";

function ScoreBoard({ scores }) {
  return (
    <div className="bg-gray-50 border rounded p-4 mt-4">
      <h3 className="font-bold mb-2">Historique des scores</h3>
      <ul>
        {scores.map((score, idx) => (
          <li key={idx}>
            {score.text} — {score.time}s — {score.wpm} MPM — {score.errors} erreurs
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScoreBoard;