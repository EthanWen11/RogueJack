import { MapNode } from "./mapNode";

export function generateFloorMap(): MapNode[] {
  const nodeTypes: ("battle" | "battle" | "boss" | "shop")[] = ["battle", "battle", "boss", "shop"];

  const nodes: MapNode[] = nodeTypes.map((type, index) => ({
    id: index,
    type,
    status: index === 0 ? "current" : "not_reachable",
    x: index * 100,
    y: 0,
    leftNeighborIds: [],
    rightNeighborIds: [],
  }));

  for (let i = 0; i < nodes.length; i++) {
    if (i > 0) {
      nodes[i].leftNeighborIds.push(nodes[i - 1].id);
    }
    if (i < nodes.length - 1) {
      nodes[i].rightNeighborIds.push(nodes[i + 1].id);
    }
  }

  return nodes;
}
