import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";
import PauseMenu from "../components/PauseMenu";
import DeckViewer from "../components/DeckViewer";
import { MapNode } from "../utils/mapNode";
import { advanceNode } from "../lib/gameStateManager";

interface MapScreenProps {
  onEnterBattle: () => void;
  onPause: () => void;
  onDeck: () => void;
}

const MapScreen: React.FC<MapScreenProps> = () => {
  const { gameState, setGameState } = useContext(GameContext);
  console.log("MapScreen state:", gameState);
  const [pauseOpen, setPauseOpen] = useState(false);
  const [deckOpen, setDeckOpen] = useState(false);
  const localMapData = gameState.map?.nodes ?? [];

  const handleNodeClick = (node: MapNode) => {
    const updatedState = advanceNode(gameState, node.id);
    setGameState(updatedState);
  };

  const getNodeImage = (type: string) => {
    switch (type) {
      case "battle":
        return "/images/battle.png";
      case "boss":
        return "/images/boss.png";
      case "shop":
        return "/images/shop.png";
      default:
        return "";
    }
  };

  const getBorderImage = (status: string) => {
    switch (status) {
      case "current":
      case "unvisited":
        return "/images/red_border.png";
      case "passed":
      case "not_reachable":
      case "current_complete":
        return "/images/black_border.png";
      default:
        return "";
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden">
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded"
        onClick={() => setPauseOpen(true)}
      >
        Pause
      </button>

      <button
        className="absolute top-4 left-4 bg-green-500 text-white p-2 rounded"
        onClick={() => setDeckOpen(!deckOpen)}
      >
        Deck
      </button>

      <div className="flex justify-center items-center flex-wrap gap-4 mt-20">
        {localMapData?.map((node) => (
          <button
            key={node.id}
            className="relative w-20 h-20 rounded-full flex items-center justify-center border"
            onClick={() => handleNodeClick(node)}
            disabled={
              !(
                node.status === "current" ||
                (node.status === "unvisited" &&
                  localMapData.some((n) => n.status === "current_complete"))
              )
            }
            style={{
              backgroundImage: `url(${getNodeImage(node.type)})`,
              backgroundSize: "cover",
              borderImage: `url(${getBorderImage(node.status)}) 30 round`,
              borderWidth: "4px",
              borderStyle: "solid",
            }}
          >
            {/* Optional label */}
            <span className="text-white font-bold drop-shadow-sm">{node.id}</span>
          </button>
        ))}
      </div>

      {pauseOpen && (
        <PauseMenu
          onClose={() => setPauseOpen(false)}
          onReturnToMainMenu={() => {
            // Add logic here
          }}
        />
      )}

      {deckOpen && <DeckViewer onClose={() => setDeckOpen(false)} />}
    </div>
  );
};

export default MapScreen;
