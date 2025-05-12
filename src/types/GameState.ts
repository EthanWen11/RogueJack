import { MapNode } from "../utils/mapNode"

export interface GameState {
  map: { nodes: MapNode[] } | null;
  currentNode: number;
  floor: number;
}