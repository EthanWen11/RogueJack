export default function ShopScreen({ onPause, onDeck }: { onPause: () => void; onDeck: () => void }) {
  return (
    <div className="p-4 relative">
      <h2 className="text-2xl mb-4">Shop</h2>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card" onClick={() => alert("Enhance or purchase")}>
            Card {i + 1}
          </div>
        ))}
      </div>
      <button className="absolute top-4 right-20" onClick={onPause}>Pause</button>
      <button className="absolute top-4 right-4" onClick={onDeck}>Deck</button>
    </div>
  );
}
