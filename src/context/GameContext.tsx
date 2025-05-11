import React, { createContext, useContext, useState, ReactNode } from "react";
import { GameState } from "../types/GameState"; // Import from shared types

// Define the context shape
interface GameContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

// Initial state of the game
const initialGameState: GameState = {
  map: null,
  currentNode: 0,
};

// Create context with default values
export const GameContext = createContext<GameContextType>({
  gameState: initialGameState,
  setGameState: () => {
    console.warn("setGameState called outside of GameProvider");
  },
});

// Provider component
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to access the context
export const useGameContext = () => useContext(GameContext);
