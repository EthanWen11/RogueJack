import { MapNode } from "./mapNode";

export function generateFloorMap(): MapNode[] {
  const nodeTypes: ("battle" | "battle" | "boss" | "shop")[] = ["battle", "battle", "boss", "shop"];

  return nodeTypes.map((type, index) => ({
    id: index,
    type,
    status: index === 0 ? "current" : "not_reachable",
    x: index * 100, // example layout spacing
    y: 0,
  }));
}