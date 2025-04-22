export default function DeckViewer({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-0 right-0 w-1/3 h-full bg-white shadow-xl p-4 overflow-y-auto z-20">
      <h3 className="text-xl mb-2">Player Deck</h3>
      {[...Array(20)].map((_, i) => (
        <div key={i} className="card mb-2">Card {i + 1}</div>
      ))}
      <button className="mt-4" onClick={onClose}>
        Close
      </button>
    </div>
  );
}
