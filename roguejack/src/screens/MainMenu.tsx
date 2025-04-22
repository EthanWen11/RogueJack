export default function MainMenu({ onNewGame, onLoadGame }: { onNewGame: () => void; onLoadGame: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 mt-20">
      <h1 className="text-4xl font-bold">RogueJack: A Blackjack Roguelite</h1>
      <button onClick={onNewGame}>New Game</button>
      <button onClick={onLoadGame}>Load Game</button>
    </div>
  );
}
