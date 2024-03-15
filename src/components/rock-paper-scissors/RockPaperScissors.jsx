import React, { useState, useEffect } from "react";

import Button from "../button/Button";
import paper from "../../images/paper.svg";
import scissors from "../../images/scissors.svg";
import rock from "../../images/rock.svg";

import "./RockPaperScissors.css";

const selections = [
  { alt: "rock", url: rock },
  { alt: "paper", url: paper },
  { alt: "scissors", url: scissors },
];

function RockPaperScissors() {
  const [gameState, setGameState] = useState({
    playerVal: null,
    computerVal: null,
    winner: null,
    playerScore: 0,
    computerScore: 0,
  });

  const maxScore = 5;

  const reset = () => {
    setGameState({
      playerVal: null,
      computerVal: null,
      winner: null,
      playerScore: 0,
      computerScore: 0,
    });
  };

  const { playerVal, computerVal, playerScore, computerScore, winner } =
    gameState;

  const logic = (playerVal, computerVal) => {
    if (playerVal.alt === computerVal.alt) {
      return 0;
    } else if (
      (playerVal.alt === "rock" && computerVal.alt === "scissors") ||
      (playerVal.alt === "scissors" && computerVal.alt === "paper") ||
      (playerVal.alt === "paper" && computerVal.alt === "rock")
    ) {
      return 1;
    } else {
      return -1;
    }
  };

  const descision = (playerChoice) => {
    const playerChosen = selections.find((s) => s.alt === playerChoice);
    const computerChoice =
      selections[Math.floor(Math.random() * selections.length)];
    const val = logic(playerChosen, computerChoice);

    if (val === 1) {
      setGameState((s) => ({
        ...s,
        playerVal: playerChosen,
        computerVal: computerChoice,
        playerScore: s.playerScore + 1,
      }));
    } else if (val === -1) {
      setGameState((s) => ({
        ...s,
        playerVal: playerChosen,
        computerVal: computerChoice,
        computerScore: s.computerScore + 1,
      }));
    } else {
      setGameState((s) => ({
        ...s,
        computerVal: computerChoice,
        playerVal: playerChosen,
      }));
    }
  };

  useEffect(() => {
    if (playerScore === maxScore) {
      setGameState((s) => ({ ...s, winner: "You Win!!" }));
    } else if (computerScore === maxScore) {
      setGameState((s) => ({ ...s, winner: "Computer Wins!" }));
    }
  }, [computerScore, playerScore]);

  return (
    <div className="container">
      <h1>Rock-Paper-Scissors</h1>
      <p className="winner-text">{winner}</p>
      <div className="score-section">
        <div className="player">
          You: <span className="value">{playerScore}</span>
        </div>
        <div className="player">
          Computer: <span className="value">{computerScore}</span>
        </div>
      </div>
      <div className="game-section">
        <div className="image-section">
          {!playerVal ? (
            <p className="prompt">Make a selection!</p>
          ) : (
            <>
              <div className="image-box">
                {playerVal && <img src={playerVal.url} alt={playerVal.alt} />}
              </div>
              <div className="image-box">
                {computerVal && (
                  <img src={computerVal.url} alt={computerVal.alt} />
                )}
              </div>
            </>
          )}
        </div>
        <div className="button-group">
          <Button value="Rock" onClick={() => descision("rock")} />
          <Button value="Paper" onClick={() => descision("paper")} />
          <Button value="Scissors" onClick={() => descision("scissors")} />
        </div>
      </div>
      {winner && (
        <div className="button-group reset">
          <Button value="Restart Game?" onClick={reset} />
        </div>
      )}
    </div>
  );
}

export default RockPaperScissors;
