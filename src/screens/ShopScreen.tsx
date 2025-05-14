export default function ShopScreen({
    onWin,
    onPause,
    onDeck,
  }: {
    onWin: () => void;
    onPause: () => void;
    onDeck: () => void;
  }) {

    const handleContinue = () => {
    onWin();
  };
  
  return (
    <div className="p-4 relative">
      <h2 className="text-2xl mb-4">Shop</h2>
      <div className="grid grid-cols-3 gap-4">
        <h3>Welcome to the Shop!</h3>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card" onClick={() => alert("Enhance or purchase")}>
            Card {i + 1}
          </div>
        ))}
        <button
            className="mx-auto block bg-purple-600 text-white p-3 rounded"
            onClick={handleContinue}
          >
            Continue
          </button>
      </div>
      <button className="absolute top-4 right-20" onClick={onPause}>Pause</button>
      <button className="absolute top-4 right-4" onClick={onDeck}>Deck</button>
    </div>
  );
}