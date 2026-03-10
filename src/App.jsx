import { useState } from "react";
import "./App.css";
import { ALL_WORDS } from "./word";
import ratImg from "./assets/rat.png";
import normal1 from "./assets/Black-White.png";
import normal2 from "./assets/Cleo.png";
import normal3 from "./assets/Grey.png";
import normal4 from "./assets/Olivia.png";
import normal5 from "./assets/Orange.png";
import normal6 from "./assets/White.png";
import mascot from "./assets/mascot.png";

const SCREENS = {
  WELCOME: "WELCOME",
  SETTINGS: "SETTINGS",
  REVEAL: "REVEAL",
  STARTER: "STARTER",
};

const normalImgs = [normal1, normal2, normal3, normal4, normal5, normal6];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.WELCOME);

  // Settings
  const [players, setPlayers] = useState(6);
  const [impostors, setImpostors] = useState(1);

  // Game state
  const [assignments, setAssignments] = useState(null); // { impostorSet, word, hint, playerAvatars }
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [starter, setStarter] = useState(null);

  // Reveal UX
  const [isRevealing, setIsRevealing] = useState(false);
  const [hasRevealedOnce, setHasRevealedOnce] = useState(false);

  function startNewGame() {
    setAssignments(null);
    setCurrentPlayerIndex(0);
    setStarter(null);
    setIsRevealing(false);
    setHasRevealedOnce(false);
    setScreen(SCREENS.WELCOME);
  }

  function generateGame() {
    // pick a word
    const randomWord = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];

    // pick impostors
    const impostorSet = new Set();
    while (impostorSet.size < impostors) {
      const randomIndex = Math.floor(Math.random() * players);
      impostorSet.add(randomIndex);
    }

    // assign shuffled normal avatars for all players
    let playerAvatars = [];
    while (playerAvatars.length < players) {
      playerAvatars = playerAvatars.concat(shuffleArray(normalImgs));
    }
    playerAvatars = playerAvatars.slice(0, players);

    setAssignments({
      impostorSet,
      word: randomWord.word,
      hint: randomWord.hint,
      playerAvatars,
    });

    setCurrentPlayerIndex(0);
    setStarter(null);
    setIsRevealing(false);
    setHasRevealedOnce(false);
    setScreen(SCREENS.REVEAL);
  }

  function pickStarter() {
    const r = Math.floor(Math.random() * players);
    setStarter(r);
    setScreen(SCREENS.STARTER);
  }

  const canProceed = hasRevealedOnce;

  return (
    <div className="page">
      <div className="frame">
        
        <div className="brandHeader">
          <div className="brandTitle">UNDERCOVER</div>
          <img className="brandMascot" src={mascot} alt="Undercover mascot" />
        </div>

      <div className="card">
        {screen === SCREENS.WELCOME && (
          <section className="screen">
            <h1 className="title">Welcome</h1>
            <p className="tagline">Find the rat</p>

            <button className="btn primary" onClick={() => setScreen(SCREENS.SETTINGS)}>
              Start
            </button>
          </section>
        )}

        {screen === SCREENS.SETTINGS && (
          <section className="screen">
            <h2 className="subtitle">Settings</h2>

            <div className="field">
              <label className="label">Players</label>
              <input
                className="input"
                type="number"
                min={3}
                max={20}
                value={players}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  setPlayers(n);
                  setImpostors((k) => Math.min(k, Math.max(1, n - 1)));
                }}
              />
              <div className="hint">3–20 players</div>
            </div>

            <div className="field">
              <label className="label">Impostors</label>
              <input
                className="input"
                type="number"
                min={1}
                max={Math.max(1, players - 1)}
                value={impostors}
                onChange={(e) => setImpostors(Number(e.target.value))}
              />
              <div className="hint">Max: {players - 1}</div>
            </div>

            <div className="row">
              <button className="btn" onClick={() => setScreen(SCREENS.WELCOME)}>
                Back
              </button>
              <button className="btn primary" onClick={generateGame}>
                Next
              </button>
            </div>
          </section>
        )}

        {screen === SCREENS.REVEAL && (
          <section className="screen">
            <h2 className="subtitle">
              Player <span className="pill">{currentPlayerIndex + 1}</span>{" "}
              <span className="muted">/ {players}</span>
            </h2>

            {assignments && (
              <div className="revealWrap">
                <div
                  className="holdBox"
                  onPointerDown={() => {
                    setIsRevealing(true);
                    setHasRevealedOnce(true);
                  }}
                  onPointerUp={() => setIsRevealing(false)}
                  onPointerCancel={() => setIsRevealing(false)}
                  onPointerLeave={() => setIsRevealing(false)}
                >
                  {!isRevealing ? (
                    <div className="holdText">
                      Hold to reveal
                      <div className="muted small">Κράτα πατημένο για να δεις ρόλο</div>
                    </div>
                  ) : assignments.impostorSet.has(currentPlayerIndex) ? (
                    <div className="reveal">
                      <img className="impostorImg" src={ratImg} alt="Impostor" />
                      <div className="role bad">Undercover</div>
                      <div className="line">Hint: {assignments.hint}</div>
                    </div>
                  ) : (
                    <div className="reveal">
                      <img
                        className="impostorImg"
                        src={assignments.playerAvatars[currentPlayerIndex]}
                        alt="Normal"
                      />
                      <div className="role good">NORMAL</div>
                      <div className="line">Word: {assignments.word}</div>
                    </div>
                  )}
                </div>

                <div className="muted small center">Release, then pass the phone.</div>
              </div>
            )}

            <div className="row">
              <button className="btn" onClick={startNewGame}>
                New game
              </button>

              {currentPlayerIndex < players - 1 ? (
                <button
                  className={`btn primary ${canProceed ? "" : "disabled"}`}
                  disabled={!canProceed}
                  onClick={() => {
                    setCurrentPlayerIndex((i) => i + 1);
                    setIsRevealing(false);
                    setHasRevealedOnce(false);
                  }}
                >
                  Next player
                </button>
              ) : (
                <button
                  className={`btn primary ${canProceed ? "" : "disabled"}`}
                  disabled={!canProceed}
                  onClick={pickStarter}
                >
                  Pick starter
                </button>
              )}
            </div>
          </section>
        )}

        {screen === SCREENS.STARTER && (
          <section className="screen">
            <h2 className="subtitle">Starter</h2>

            <div className="starterBox">
              <div className="starterLabel">Player</div>
              <div className="starterNum">{starter !== null ? starter + 1 : "?"}</div>
              <div className="starterLabel">starts</div>
            </div>

            <div className="row">
              <button className="btn" onClick={pickStarter}>
                Pick again
              </button>
              <button className="btn primary" onClick={startNewGame}>
                New game
              </button>
            </div>
          </section>
        )}
        </div>
      </div>
    </div>
  );
}