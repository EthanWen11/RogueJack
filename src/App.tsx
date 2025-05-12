import React, { useState, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainMenu from "./screens/MainMenu";
import LoadGameScreen from "./screens/LoadGameScreen";
import MapScreen from "./screens/MapScreen";
import BattleScreen from "./screens/BattleScreen";
import ShopScreen from "./screens/ShopScreen";
import GameOverScreen from "./screens/GameOverScreen";
import PauseMenu from "./components/PauseMenu";
import DeckViewer from "./components/DeckViewer";
import { startNewGame, setGameState } from "./lib/gameStateManager";
import "./App.css";

export default function App() {
  const navigate = useNavigate();
  const [deckOpen, setDeckOpen] = useState(false);
  const [pauseOpen, setPauseOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle new game and load game actions
  const handleNewGame = () => {
    console.log("Starting new game...");
    const newGameState = startNewGame(); // Initialize the game state
    setGameState(newGameState)
    navigate("/map"); // Navigates to the MapScreen
  };

  const handleLoadGame = () => {
    console.log("Loading saved game...");
    // Implement the logic to load a saved game here
    navigate("/map"); // Navigates to the MapScreen after loading a game
  };

  const handleEnterBattle = () => {
    console.log("Entering battle...");
    navigate("/battle");
  };

  const handlePause = () => {
    setPauseOpen(true);
  };

  const handleDeck = () => {
    setDeckOpen((prev) => !prev);
  };

  // Handle game over actions
  const handleRestart = () => {
    console.log("Restarting game...");
    const newGameState = startNewGame();
    navigate("/map"); // Navigates to the MapScreen after restarting
  };

  const handleReturnToMainMenu = () => {
    window.location.assign("/"); // Assuming we want to go back to the main menu after game over
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      <Routes>
        <Route
          path="/"
          element={<MainMenu onNewGame={handleNewGame} onLoadGame={handleLoadGame} />}
        />
        <Route
          path="/load"
          element={<LoadGameScreen onLoad={handleLoadGame} fileInputRef={fileInputRef} />}
        />
        <Route
          path="/map"
          element={
            <MapScreen
              onEnterBattle={handleEnterBattle}  // Pass the onEnterBattle prop
              onPause={handlePause}  // Pass the onPause prop
              onDeck={handleDeck}    // Pass the onDeck prop
            />
          }
        />
        <Route
          path="/battle"
          element={
            <BattleScreen
              onWin={() => navigate("/map")}
              onLose={() => navigate("/gameover")}
              onPause={() => setPauseOpen(true)}
              onDeck={() => setDeckOpen((prev) => !prev)}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <ShopScreen
              onPause={() => setPauseOpen(true)}
              onDeck={() => setDeckOpen((prev) => !prev)}
            />
          }
        />
        <Route
          path="/gameover"
          element={<GameOverScreen onRestart={handleRestart} onMainMenu={handleReturnToMainMenu} />}
        />
      </Routes>

      {deckOpen && <DeckViewer onClose={() => setDeckOpen(false)} />}
      {pauseOpen && (
        <PauseMenu
          onClose={() => setPauseOpen(false)}
          onReturnToMainMenu={handleReturnToMainMenu}
        />
      )}
    </div>
  );
}
