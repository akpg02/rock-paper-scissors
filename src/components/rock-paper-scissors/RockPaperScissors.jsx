import React, { useState, useEffect } from "react";
import "./RockPaperScissors.css";
import Button from "../button/Button";

import "./RockPaperScissors.css";

const selections = [
  { alt: "rock", url: "./images/rock.svg" },
  { alt: "paper", url: "./images/paper.svg" },
  { alt: "scissors", url: "./images/scissors.svg" },
];

function RockPaperScissors() {
  const [userInput, setUserInput] = useState(null);
  const [aiInput, setAiInput] = useState(null);
  const [userTurn, setUserTurn] = useState(true);

  const randomSelection = () => {
    return Math.floor(Math.random() * selections.length);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    const selected = selections.find(
      (s) => s.alt.toLowerCase() === e.target.value.toLowerCase()
    );
    setUserInput(selected);
    setUserTurn(false);
  };

  useEffect(() => {
    if (!userTurn) {
      const randNum = randomSelection();
      setAiInput(selections[randNum]);
      setUserTurn(true);
    }
  }, [userTurn]);

  return (
    <div className="container">
      <h1>Rock-Paper-Scissors</h1>
      <div className="button-group">
        <Button value="Reset" />
      </div>
      <div className="score-section">
        <div className="player">
          You: <span className="value"></span>
        </div>
        <div className="player">
          Computer: <span className="value"></span>
        </div>
      </div>
      <div className="image-section">
        {!userInput ? (
          <p className="prompt">Make a selection!</p>
        ) : (
          <>
            <div className="image-box">
              {userInput && <img src={userInput.url} alt={userInput.alt} />}
            </div>
            <div className="image-box">
              {aiInput && <img src={aiInput.url} alt={aiInput.alt} />}
            </div>
          </>
        )}
      </div>
      <div className="button-group">
        <Button value="Rock" onClick={handleButtonClick} />
        <Button value="Paper" onClick={handleButtonClick} />
        <Button value="Scissors" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default RockPaperScissors;
