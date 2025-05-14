import { MapNode } from "../utils/mapNode";
import { Player } from "../logic/battleclass/player";

export const player = new Player();

export interface GameState {
  map: { nodes: MapNode[] } | null;
  currentNode: number;
  floor: number;
  nodesCompletedThisFloor: number;
  currency: number;
}