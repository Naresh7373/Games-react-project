import React, { useEffect, useState } from "react";
import { sfx } from "../utils/sfx";

const EMOJIS = ["🍕","🍔","🍟","🍩","🍓","🍦","🥨","🍇"];

export default function MemoryMatch({ goBack }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);   // indices
  const [matched, setMatched] = useState([]);   // emoji values
  const [turns, setTurns] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => newGame(), []);

  function newGame() {
    const deck = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, id) => ({ id, emoji }));
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setTurns(0);
    setFinished(false);
    sfx.click();
  }

  function flip(i) {
    if (finished || flipped.includes(i) || flipped.length === 2) return;
    sfx.flip();
    const f = [...flipped, i];
    setFlipped(f);

    if (f.length === 2) {
      setTurns((t) => t + 1);
      const [a, b] = f;
      if (cards[a].emoji === cards[b].emoji) {
        setTimeout(() => {
          setMatched((m) => [...m, cards[a].emoji]);
          sfx.match();
          setFlipped([]);
        }, 240);
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  }

  useEffect(() => {
    if (matched.length === EMOJIS.length && cards.length) {
      setFinished(true);
      setTimeout(sfx.win, 150);
    }
  }, [matched, cards.length]);

  return (
    <>
      <h2 className="game-title">🃏 Memory Match</h2>

      <div className="mem-grid">
        {cards.map((card, i) => {
          const up = flipped.includes(i) || matched.includes(card.emoji);
          return (
            <button
              key={card.id}
              className={`mem-card ${up ? "up" : ""}`}
              onClick={() => flip(i)}
              disabled={up || finished}
            >
              <div className="card-face card-front">❓</div>
              <div className="card-face card-back">{card.emoji}</div>
            </button>
          );
        })}
      </div>

      <p className="status">
        {finished ? `🎉 Finished in ${turns} turns!` : `Turns: ${turns}`}
      </p>

      <div className="controls">
        <button onClick={newGame}>🔄 New Game</button>
        <button className="secondary" onClick={goBack}>⬅ Back</button>
      </div>
    </>
  );
}
