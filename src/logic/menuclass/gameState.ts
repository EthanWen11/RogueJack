// src/state/gameState.ts

import { MapNode } from "../../utils/mapNode";
import { generateFloorMap } from "../../utils/roomGenerator";

export interface GameState {
  floor: number;
  currentNode: number;
  map: MapNode[];
}

let state: GameState = {
  floor: 1,
  currentNode: 0,
  map: [],
};

export function getGameState(): GameState {
  return state;
}

export function startNewGame(): void {
  state = {
    floor: 1,
    currentNode: 0,
    map: generateFloorMap(),
  };
}

export function advanceNode() {
  const current = state.map.find((node) => node.status === "current");

  if (!current) return;

  // Mark the current node as complete
  current.status = "passed";

  const next = state.map.find((node) => node.id === current.id + 1);

  if (next) {
    next.status = "current";
    state.currentNode = next.id;
  } else {
    // End of floor - start next floor
    state.floor += 1;
    state.map = generateFloorMap(); // Generate new map
    state.currentNode = 0;
  }
}