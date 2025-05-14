import { getExternalSetGameState } from "../context/GameContext";
import { useBattleGame } from "../hooks/useBattleGame";
import { BossEffect } from "../logic/battleclass/bossEffect";

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
    const {
      hand,
      handValue,
      drawCard,
      stay,
      totalScore,
      currentRoundScore,
      roundsLeft,
      roundEnded,
      startNewRound,
      targetScore,
      finishBattle,
      battleEnded,
      didWin,
      bossEffect,
      debuffMessage,
      netCurrency
    } = useBattleGame(5);

    const handleContinue = () => {
    if (didWin) onWin();
    else onLose();
  };

  if (roundsLeft === 0 && roundEnded && !battleEnded) {
    finishBattle();
  }

  return (
    <div className="p-4 relative">
      <h2 className="text-2xl mb-2">Battle</h2>
      <p className="mb-1 text-lg font-semibold">Target Score: {targetScore}</p>
      <p className="mb-2">Rounds Left: {roundsLeft}</p>
      <p className="mb-2">Total Score: {totalScore}</p>

      {bossEffect !== BossEffect.None && (
        <p className="mb-2 text-red-600">{debuffMessage}</p>
      )}

      <p className="mb-2">Hand Total: {handValue}</p>
      <p className="mb-2">Current Round Score: {currentRoundScore}</p>

      <div className="flex gap-2 mb-4">
        {hand.map((card, i) => (
          <div key={i} className="card p-2 border rounded bg-white">
            {card.getValue()} of {card.getSuit()}
          </div>
        ))}
      </div>

      {!battleEnded ? (
        <div className="flex items-center gap-4 mb-4">
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={drawCard}
            disabled={roundEnded}
          >
            Hit
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={stay}
            disabled={roundEnded}
          >
            Stay
          </button>
          {roundEnded && (
            <button
              className="bg-green-600 text-white p-2 rounded"
              onClick={startNewRound}
            >
              Next Round
            </button>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <h3 className="text-2xl font-bold text-center mb-4">
            {didWin ? "You Won!" : "You Lost!"}
          </h3>
          {/* <p>
            {"You got " + {totalScore - targetScore} + " currency!"}
          </p> */}
          <button
            className="mx-auto block bg-purple-600 text-white p-3 rounded"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      )}

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
    </div>
  );
}