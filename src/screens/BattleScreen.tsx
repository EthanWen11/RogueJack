export default function BattleScreen({
    onWin,
    onLose,
    onPause,
    onDeck,
  }: {
    onWin: () => void;
    onLose: () => void;
    onPause: () => void;
    onDeck: () => void;
  }) {
    return (
      <div className="p-4 relative">
        <h2 className="text-2xl mb-4">Battle</h2>
        <div className="flex items-center gap-4 mb-4">
          <button className="bg-blue-500 text-white p-2 rounded">Hit</button>
          <button className="bg-blue-500 text-white p-2 rounded">Stay</button>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="card">Card 1</div>
          <div className="card">Card 2</div>
        </div>
        <div className="bg-gray-300 w-full h-6 rounded-full mb-4">
          <div className="bg-green-500 h-6 rounded-full w-2/3" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="card">Modifier 1</div>
          <div className="card">Modifier 2</div>
        </div>
        <button
          className="absolute top-4 right-20 bg-blue-500 text-white p-2 rounded"
          onClick={onPause}
        >
          Pause
        </button>
        <button
          className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded"
          onClick={onDeck}
        >
          Deck
        </button>
        <div className="mt-8 flex gap-4">
          <button className="bg-red-500 text-white p-2 rounded" onClick={onWin}>
            Win
          </button>
          <button className="bg-red-500 text-white p-2 rounded" onClick={onLose}>
            Lose
          </button>
        </div>
      </div>
    );
  }
  