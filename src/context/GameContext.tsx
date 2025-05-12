// GameContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { GameState } from "../types/GameState";

interface GameContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const initialGameState: GameState = {
  map: null,
  currentNode: 0,
  floor: 0,
};

export const GameContext = createContext<GameContextType>({
  gameState: initialGameState,
  setGameState: () => {},
});

// Declare external variable to store setGameState reference
let externalSetGameState: React.Dispatch<React.SetStateAction<GameState>> = () => {
  throw new Error("setGameState called before GameProvider was mounted");
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // Save the setter function
  externalSetGameState = setGameState;

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

// Hook for components
export const useGameContext = () => useContext(GameContext);

// Export the setter for non-components
export const getExternalSetGameState = () => externalSetGameState;
