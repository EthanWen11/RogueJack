export type NodeType = "battle" | "boss" | "shop";

export type NodeStatus =
  | "not_reachable"
  | "unvisited"
  | "current"
  | "current_complete"
  | "passed";

export interface MapNode {
  id: number;
  type: NodeType;
  status: NodeStatus;
  x: number;
  y: number;
}