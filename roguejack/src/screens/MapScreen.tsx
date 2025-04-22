import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";
import PauseMenu from "../components/PauseMenu";
import DeckViewer from "../components/DeckViewer";

// Define a separate frontend-only type for map nodes
export interface MapNode {
  id: number;
  status: "unvisited" | "passed" | "current" | "not_reachable";
  x: number;
  y: number;
}

interface MapData {
  nodes: MapNode[];
}

interface MapScreenProps {
  onEnterBattle: () => void;
  onPause: () => void;
  onDeck: () => void;
}

const MapScreen: React.FC<MapScreenProps> = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const [pauseOpen, setPauseOpen] = useState(false);
  const [deckOpen, setDeckOpen] = useState(false);

  // Create a local state to hold typed map data
  const [localMapData, setLocalMapData] = useState<MapNode[] | null>(null);

  useEffect(() => {
    if (!gameState.map) {
      fetchMapData();
    } else {
      // If map already exists in gameState, assume it's typed correctly
      setLocalMapData(gameState.map.nodes as MapNode[]);
    }
  }, [gameState.map]);

  const fetchMapData = async () => {
    try {
      const fetchedMapData = await fetch("/api/map").then((res) => res.json());

      const mapNodes: MapNode[] = fetchedMapData.nodes.map((node: any) => ({
        id: node.id,
        status: node.status ?? "unvisited",
        x: node.x ?? 0,
        y: node.y ?? 0,
      }));

      const mapData: MapData = { nodes: mapNodes };

      setGameState((prevState) => ({
        ...prevState,
        map: mapData,
        currentNode: 0,
      }));

      setLocalMapData(mapNodes);
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  const handleNodeClick = (node: MapNode) => {
    if (node.status === "unvisited" || node.status === "passed") {
      setGameState((prevState) => ({
        ...prevState,
        currentNode: node.id,
      }));
    }
  };

  const getNodeStyle = (node: MapNode) => {
    switch (node.status) {
      case "unvisited":
        return "bg-black";
      case "passed":
        return "bg-gray-400";
      case "current":
        return "bg-blue-500";
      case "not_reachable":
        return "bg-gray-200";
      default:
        return "bg-white";
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
        {localMapData?.map((node: MapNode) => (
          <button
            key={node.id}
            className={`w-16 h-16 rounded-full flex items-center justify-center ${getNodeStyle(node)} border border-gray-800`}
            onClick={() => handleNodeClick(node)}
            disabled={node.status === "not_reachable"}
          >
            {node.id}
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
