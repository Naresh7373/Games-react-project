import React, { useState } from "react";
import { sfx } from "../utils/sfx";

const CHOICES = [
  { key: "rock",     emoji: "✊", color: "#ff7675" },
  { key: "paper",    emoji: "✋", color: "#74b9ff" },
  { key: "scissors", emoji: "✌", color: "#55efc4" },
];

const resultFor = (p, c) =>
  p === c ? "draw" :
  (p === "rock" && c === "scissors") ||
  (p === "paper" && c === "rock") ||
  (p === "scissors" && c === "paper") ? "win" : "lose";

export default function RockPaperScissors({ goBack }) {
  const [player, setPlayer] = useState(null);
  const [computer, setComputer] = useState(null);
  const [outcome, setOutcome] = useState("");
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });

  function play(key) {
    sfx.click();
    const comp = CHOICES[Math.floor(Math.random() * 3)].key;
    const res = resultFor(key, comp);
    setPlayer(key);
    setComputer(comp);
    setOutcome(res);
    setScore(s => ({ ...s, [res]: s[res] + 1 }));
    if (res === "win")  sfx.win();
    if (res === "lose") sfx.lose();
    if (res === "draw") sfx.draw();
  }

  function reset() {
    setPlayer(null); setComputer(null); setOutcome("");
    setScore({ win: 0, lose: 0, draw: 0 });
    sfx.click();
  }

  const outcomeText =
    outcome === "win"  ? "You Win! 🎉" :
    outcome === "lose" ? "You Lose 😢" :
    outcome === "draw" ? "Draw 😐"  : "Choose a move";

  return (
    <>
      <h2 className="game-title">✊✋✌ Rock Paper Scissors</h2>

      <div className="rps-choices">
        {CHOICES.map((c) => (
          <button
            key={c.key}
            className="rps-btn"
            style={{ "--btnColor": c.color }}
            onMouseEnter={sfx.hover}
            onClick={() => play(c.key)}
          >
            {c.emoji}
          </button>
        ))}
      </div>

      <div className={`rps-outcome ${outcome}`}>
        <div className="pick">
          <span>You</span>
          <div className="bubble">{CHOICES.find(x=>x.key===player)?.emoji || "–"}</div>
        </div>
        <h3 className="result-text">{outcomeText}</h3>
        <div className="pick">
          <span>Bot</span>
          <div className="bubble">{CHOICES.find(x=>x.key===computer)?.emoji || "–"}</div>
        </div>
      </div>

      <div className="score">
        <div>🏆 {score.win}</div>
        <div>😐 {score.draw}</div>
        <div>💥 {score.lose}</div>
      </div>

      <div className="controls">
        <button onClick={reset}>🔄 Reset Score</button>
        <button className="secondary" onClick={goBack}>⬅ Back</button>
      </div>
    </>
  );
}
