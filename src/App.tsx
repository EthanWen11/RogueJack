import React, { useState } from "react";
import MainMenu from "./screens/MainMenu";
import LoadGameScreen from "./screens/LoadGameScreen";
import MapScreen from "./screens/MapScreen";
import BattleScreen from "./screens/BattleScreen";
import ShopScreen from "./screens/ShopScreen";
import GameOverScreen from "./screens/GameOverScreen";
import PauseMenu from "./components/PauseMenu";
import DeckViewer from "./components/DeckViewer";
import { GameProvider } from "./context/GameContext";
import "./App.css";

export default function App() {
  console.log("App mounted"); // 🔍 Should appear
  const [screen, setScreen] = useState<string>("menu");
  const [deckOpen, setDeckOpen] = useState<boolean>(false);
  const [pauseOpen, setPauseOpen] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleReturnToMainMenu = () => {
    setScreen("menu"); // Navigate to main menu
    // Optionally reset game state here if needed
  };

  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-100 p-4 relative">
        {screen === "menu" && (
          <MainMenu
            onNewGame={() => setScreen("map")}
            onLoadGame={() => setScreen("load")}
          />
        )}
        {screen === "load" && (
          <LoadGameScreen onLoad={() => setScreen("map")} fileInputRef={fileInputRef} />
        )}
        {screen === "map" && (
          <MapScreen
            onEnterBattle={() => setScreen("battle")}
            onPause={() => setPauseOpen(true)}
            onDeck={() => setDeckOpen(!deckOpen)}
          />
        )}
        {screen === "battle" && (
          <BattleScreen
            onWin={() => setScreen("map")}
            onLose={() => setScreen("gameover")}
            onPause={() => setPauseOpen(true)}
            onDeck={() => setDeckOpen(!deckOpen)}
          />
        )}
        {screen === "shop" && (
          <ShopScreen
            onPause={() => setPauseOpen(true)}
            onDeck={() => setDeckOpen(!deckOpen)}
          />
        )}
        {screen === "gameover" && <GameOverScreen onRestart={() => setScreen("menu")} />}

        {deckOpen && <DeckViewer onClose={() => setDeckOpen(false)} />}
        {pauseOpen && (
          <PauseMenu
            onClose={() => setPauseOpen(false)}
            onReturnToMainMenu={handleReturnToMainMenu} // Pass the function to PauseMenu
          />
        )}
      </div>
    </GameProvider>
  );
}
