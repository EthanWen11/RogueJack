import { generateFloorMap } from "../utils/roomGenerator";
import { GameState } from "../types/GameState";
import { MapNode } from "../utils/mapNode";
import { getExternalSetGameState } from "../context/GameContext";

let externalGameState: GameState = {
  map: null,
  currentNode: 0,
  floor: 0,
};

export function startNewGame(): GameState {
  const map = generateFloorMap();
  return {
    map: { nodes: map },
    currentNode: 0,
    floor: 0,
  };
}

export function advanceNode(prevState: GameState, clickedId: number): GameState {
  if (!prevState.map) return prevState;

  const updatedNodes = [...prevState.map.nodes];
  const clickedNode = updatedNodes.find(n => n.id === clickedId);
  if (!clickedNode) return prevState;

  // CASE 1: Player clicks the current node to complete it
  if (clickedNode.status === "current") {
    clickedNode.status = "current_complete";

    // Unlock forward (right) neighbors
    clickedNode.rightNeighborIds.forEach(neighborId => {
      const neighbor = updatedNodes.find(n => n.id === neighborId);
      if (neighbor && neighbor.status === "not_reachable") {
        neighbor.status = "unvisited";
      }
    });

    return {
      ...prevState,
      map: { nodes: updatedNodes },
    };
  }

  // CASE 2: Player clicks on an unvisited neighbor to move forward
  if (clickedNode.status === "unvisited") {
    // Find the node that was just completed
    const prevCompleteNode = updatedNodes.find(n => n.status === "current_complete");
    if (prevCompleteNode) {
      prevCompleteNode.status = "passed";

      // Lock all other unvisited right neighbors
      prevCompleteNode.rightNeighborIds.forEach(neighborId => {
        const neighbor = updatedNodes.find(n => n.id === neighborId);
        if (neighbor && neighbor.status === "unvisited" && neighbor.id !== clickedId) {
          neighbor.status = "not_reachable";
        }
      });
    }

    clickedNode.status = "current";

    const isLast = clickedNode.rightNeighborIds.length === 0;

    if (isLast) {
      const newMap = generateFloorMap(); // Presumably regenerates and populates neighborIds
      return {
        map: { nodes: newMap },
        currentNode: 0,
        floor: prevState.floor + 1,
      };
    }

    return {
      ...prevState,
      map: { nodes: updatedNodes },
      currentNode: clickedId,
    };
  }

  // All other cases — do nothing
  return prevState;
}

/**
 * Globally sets the game state from anywhere, including non-component files.
 * @param newState A full GameState object or a function to update it from the current one
 */
export const setGameState = (
  newState: GameState | ((prev: GameState) => GameState)
): void => {
  const setter = getExternalSetGameState();
  setter(prev => {
    const resolvedState = typeof newState === "function" ? (newState as (prev: GameState) => GameState)(prev) : newState;
    externalGameState = resolvedState;
    return resolvedState;
  });
};

export const getGameState = (): GameState => {
  return externalGameState;
}