export default function GameOverScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 mt-20">
      <h2 className="text-3xl">Game Over</h2>
      <p>Statistics go here</p>
      <button onClick={onRestart}>New Game</button>
    </div>
  );
}
