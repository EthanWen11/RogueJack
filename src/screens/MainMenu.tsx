import { useGameContext } from "../context/GameContext";
import { startNewGame } from "../lib/gameStateManager";

export default function MainMenu({
  onNewGame,
  onLoadGame,
}: {
  onNewGame: () => void;
  onLoadGame: () => void;
}) {
  const { setGameState } = useGameContext();
  const handleNewGame = () => {
    const initialState = startNewGame(); // Initialize game default state
    console.log("New game state:", initialState); // Check this in browser console
    setGameState(initialState);
    onNewGame(); // Navigate to MapScreen
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-20">
      <h1 className="text-4xl font-bold">RogueJack: A Blackjack Roguelite</h1>
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={onLoadGame}>Load Game</button>
    </div>
  );
}
