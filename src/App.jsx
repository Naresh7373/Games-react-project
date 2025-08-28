import React, { useState } from "react";
import TicTacToe from "./games/TicTacToe";              // ← extensionless
import MemoryMatch from "./games/MemoryMatch";          // ← extensionless
import RockPaperScissors from "./games/RockPaperScissors";
import { sfx } from "./utils/sfx";

export default function App() {
  const [game, setGame] = useState(null);
  const goBack = () => setGame(null);

  const open = (name) => { sfx.click(); setGame(name); };

  return (
    <div className="hub">
      {!game && (
        <>
          <div className="hub-header">
            <div className="logo">🎮</div>
            <h1>Fun Game Hub</h1>
            <p className="subtitle">Pick a game and have fun!</p>
          </div>

          <div className="cards">
            <button className="card" onClick={() => open("tic")}>
              <div className="card-icon">❌⭕</div>
              <h3>Tic Tac Toe</h3>
              <p>Classic 3×3 strategy</p>
            </button>

            <button className="card" onClick={() => open("memory")}>
              <div className="card-icon">🃏</div>
              <h3>Memory Match</h3>
              <p>Flip & find the pairs</p>
            </button>

            <button className="card" onClick={() => open("rps")}>
              <div className="card-icon">✊✋✌</div>
              <h3>Rock Paper Scissors</h3>
              <p>Beat the bot</p>
            </button>
          </div>

          <div className="hub-footer">Made with React + Vite</div>
        </>
      )}

      {game && (
        <div className="game-wrap">
          <div className="game-card-panel">
            {game === "tic" && <TicTacToe goBack={goBack} />}
            {game === "memory" && <MemoryMatch goBack={goBack} />}
            {game === "rps" && <RockPaperScissors goBack={goBack} />}

            <div className="controls">
              <button className="secondary" onClick={goBack}>⬅ Back to menu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
