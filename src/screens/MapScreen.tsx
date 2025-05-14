import React, { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import PauseMenu from "../components/PauseMenu";
import DeckViewer from "../components/DeckViewer";
import { MapNode } from "../utils/mapNode";
import { advanceNode } from "../lib/gameStateManager";
import { Player } from "../logic/battleclass/player";

interface MapScreenProps {
  onEnterBattle: (isBoss?: boolean) => void; // default false
  onEnterShop: () => void;
  onPause: () => void;
  onDeck: () => void;
}

const MapScreen: React.FC<MapScreenProps> = ({ onEnterBattle, onEnterShop, onPause, onDeck }) => {
  const { gameState, setGameState } = useContext(GameContext);
  console.log("MapScreen state:", gameState);

  const [pauseOpen, setPauseOpen] = useState(false);
  const [deckOpen, setDeckOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);

  const localMapData = gameState.map?.nodes ?? []; // Handle case where map might be null

  const handleNodeClick = (node: MapNode) => {
  // If it's the current node and it's a battle, go to battle first
  if (node.status === "current" && (node.type === "battle" || node.type === "boss")) {
    onEnterBattle(node.type === "boss"); // true if boss, false if battle
    const updatedState = advanceNode(gameState, node.id); // after the battle, advance the gameState
    setGameState(updatedState);
    setSelectedNodeId(null); // reset selected node
    return;
  }
  // If it's the current node and it's a shop, go to shop
  else if ((node.status === "current" && (node.type === "shop")) || ((node.status === "unvisited" && (node.type === "shop")))) {
    onEnterShop(); // true if shop
    const updatedState = advanceNode(gameState, node.id); // after the battle, advance the gameState
    setGameState(updatedState);
    setSelectedNodeId(null); // reset selected node
    return;
  }

  // If it's selectable but not current yet, highlight it
  if (selectedNodeId !== node.id) {
    setSelectedNodeId(node.id);
    return;
  }

  // Confirmed second click: move to node, mark it as current
  const updatedState = advanceNode(gameState, node.id);
  setGameState(updatedState);
  setSelectedNodeId(null);
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

  if (!gameState.map || localMapData.length === 0) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden">
      {/* Top Right Menu*/} 
      <div className="absolute top-4 right-4 flex space-x-4 items-center bg-white/80 px-4 py-2 rounded shadow z-10">
        <span className="text-lg font-semibold">Floor: {gameState.floor}</span>
        <button onClick={() => onDeck()} className="bg-green-500 text-white px-2 py-1 rounded">Deck</button>
        <button onClick={() => onPause()} className="bg-blue-500 text-white px-2 py-1 rounded">Pause</button>
      </div>

      {/* Map Layout */} 
      <div className="flex justify-center items-center flex-wrap gap-4 mt-20">
        {localMapData.map((node, index) => (
          <React.Fragment key={node.id}>
            {/* Node Button */}
            <button
              className="relative w-20 h-20 rounded-full flex items-center justify-center border"
              onClick={() => handleNodeClick(node)}
              disabled={!(
                node.status === "current" ||
                (node.status === "unvisited" &&
                localMapData.some((n) =>
                n.status === "current_complete" &&
                n.rightNeighborIds?.includes(node.id)))
              )}
              style={{
                backgroundImage: `url(${getNodeImage(node.type)})`,
                backgroundSize: "cover",
                borderImage: `url(${getBorderImage(node.status)}) 30 round`,
                borderWidth: "4px",
                borderStyle: "solid",
                borderColor: selectedNodeId === node.id ? "yellow" : undefined,
              }}
            >
              <span className="text-white font-bold drop-shadow-sm">{node.id}</span>
            </button>

            {/* Arrow between nodes */}
            {index < localMapData.length - 1 && (
              <img
                src="/images/arrow_right.png"
                alt="Right Arrow"
                className="w-20 h-20"
              />
            )}
          </React.Fragment>
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
