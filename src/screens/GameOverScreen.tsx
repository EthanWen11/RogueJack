export default function GameOverScreen({
  onRestart,
  onMainMenu,
}: {
  onRestart: () => void;
  onMainMenu: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 mt-20">
      <h2 className="text-3xl">Game Over</h2>
      <p>Statistics go here</p>
      <button onClick={onRestart} className="bg-green-500 text-white p-2 rounded">New Game</button>
      <button onClick={onMainMenu} className="bg-gray-500 text-white p-2 rounded">Main Menu</button>
    </div>
  );
}
