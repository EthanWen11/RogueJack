import { generateFloorMap } from "../utils/roomGenerator";
import { GameState } from "../types/GameState";
import { MapNode } from "../utils/mapNode";

export function startNewGame(): GameState {
  const map = generateFloorMap();
  return {
    map: { nodes: map },
    currentNode: 0,
  };
}

export function advanceNode(prevState: GameState, clickedId: number): GameState {
  if (!prevState.map) return prevState;

  const updatedNodes = [...prevState.map.nodes];
  const currentIndex = updatedNodes.findIndex((n) => n.id === clickedId);
  const node = updatedNodes[currentIndex];

  if (!node) return prevState;

  if (node.status === "current") {
    updatedNodes[currentIndex].status = "current_complete";
    for (let i = currentIndex + 1; i < updatedNodes.length; i++) {
      if (updatedNodes[i].status === "not_reachable") {
        updatedNodes[i].status = "unvisited";
      }
    }
  } else if (node.status === "unvisited") {
    const prevCompleteIndex = updatedNodes.findIndex((n) => n.status === "current_complete");
    if (prevCompleteIndex !== -1) {
      updatedNodes[prevCompleteIndex].status = "passed";
    }
    updatedNodes[currentIndex].status = "current";
    for (let i = 0; i < updatedNodes.length; i++) {
      if (updatedNodes[i].status === "unvisited" && i !== currentIndex) {
        updatedNodes[i].status = "not_reachable";
      }
    }
  }

  const isLast = currentIndex === updatedNodes.length - 1;

  if (isLast) {
    const newMap = generateFloorMap();
    return {
      map: { nodes: newMap },
      currentNode: 0,
    };
  }

  return {
    ...prevState,
    map: { nodes: updatedNodes },
    currentNode: currentIndex,
  };
}
