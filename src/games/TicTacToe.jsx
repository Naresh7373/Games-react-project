import React, { useMemo, useState } from "react";
import { sfx } from "../utils/sfx";

const WIN = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

export default function TicTacToe({ goBack }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line } = useMemo(() => {
    for (const L of WIN) {
      const [a,b,c] = L;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: L };
      }
    }
    return { winner: null, line: [] };
  }, [board]);

  const isDraw = !winner && board.every(Boolean);

  function clickCell(i) {
    if (board[i] || winner) return;
    const next = [...board];
    next[i] = xIsNext ? "❌" : "⭕";
    sfx.click();
    setBoard(next);
    setXIsNext(!xIsNext);

    // small celebration sounds
    if (checkWin(next)) setTimeout(sfx.win, 120);
    else if (next.every(Boolean)) setTimeout(sfx.draw, 120);
  }

  function checkWin(b) {
    return WIN.some(([a,b2,c]) => b[a] && b[a] === b[b2] && b[a] === b[c]);
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    sfx.click();
  }

  return (
    <>
      <h2 className="game-title">❌⭕ Tic Tac Toe</h2>

      <div className="ttt-board">
        {board.map((val, i) => (
          <button
            key={i}
            className={`ttt-cell ${line.includes(i) ? "win-cell" : ""}`}
            onClick={() => clickCell(i)}
          >
            {val}
          </button>
        ))}
      </div>

      <p className="status">
        {winner ? `🎉 Winner: ${winner}` :
         isDraw ? "🤝 Draw" :
         `Turn: ${xIsNext ? "❌" : "⭕"}`}
      </p>

      <div className="controls">
        <button onClick={reset}>🔄 Restart</button>
        <button className="secondary" onClick={goBack}>⬅ Back</button>
      </div>
    </>
  );
}
