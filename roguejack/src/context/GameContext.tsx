import React, { createContext, useState, ReactNode, useContext } from "react";

// Define types for Node and GameState
export interface Node {
  id: number;
  status: "unvisited" | "passed" | "not_reachable" | "current";
}

export interface MapData {
  nodes: Node[];
}

export interface GameState {
  map: MapData | null;
  currentNode: number;
}

const initialState: GameState = {
  map: null,
  currentNode: 0,
};

// Create the GameContext with default values
export const GameContext = createContext<{
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}>({
  gameState: initialState,
  setGameState: () => {},
});

// Create a GameProvider component to wrap the app and provide the context
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to access the GameContext
export const useGameContext = () => useContext(GameContext);
