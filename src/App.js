import React, { useState } from "react";
import "./App.css";

const getRandomDice = () => Math.floor(Math.random() * 6) + 1;

function App() {
  const [userRoll, setUserRoll] = useState(null);
  const [botRoll, setBotRoll] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [round, setRound] = useState(1);
  const [result, setResult] = useState("");

  const rollDice = () => {
    if (round > 5) return;

    const user = getRandomDice();
    const bot = getRandomDice();

    setUserRoll(user);
    setBotRoll(bot);
    setUserScore((prev) => prev + user);
    setBotScore((prev) => prev + bot);
    setRound((prev) => prev + 1);

    if (round === 5) {
      setTimeout(() => {
        if (userScore + user > botScore + bot) setResult("You Win! 🎉");
        else if (userScore + user < botScore + bot) setResult("Bot Wins! 🤖");
        else setResult("It's a Draw! 😐");
      }, 500);
    }
  };

  const resetGame = () => {
    setUserRoll(null);
    setBotRoll(null);
    setUserScore(0);
    setBotScore(0);
    setRound(1);
    setResult("");
  };

  return (
    <div className="app">
      <h1>🎲 RollDice – Beat the Bot</h1>
      <p>Round: {round <= 5 ? round : 5}/5</p>

      <div className="dice-container">
        <div>
          <h2>You</h2>
          <div className="dice">{userRoll || "-"}</div>
          <p>Score: {userScore}</p>
        </div>
        <div>
          <h2>Bot</h2>
          <div className="dice">{botRoll || "-"}</div>
          <p>Score: {botScore}</p>
        </div>
      </div>

      {round <= 5 && <button onClick={rollDice}>Roll 🎲</button>}
      {round > 5 && (
        <>
          <h2>{result}</h2>
          <button onClick={resetGame}>Play Again</button>
        </>
      )}
    </div>
  );
}

export default App;
