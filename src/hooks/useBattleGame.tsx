import { useState, useEffect } from "react";
import { Card } from "../logic/battleclass/card";
import { Deck } from "../logic/battleclass/deck";
import { getGameState } from "../lib/gameStateManager";

const cardBaseValues: Record<string, number> = {
    "A": 8,
    "2": 10,
    "3": 9,
    "4": 8,
    "5": 7,
    "6": 6,
    "7": 5,
    "8": 4,
    "9": 3,
    "10": 1,
    "J": 1,
    "Q": 1,
    "K": 1,
}

const { floor, currentNode } = getGameState();

const calculateTargetScore = (floor: number, node: number) => {
  return Math.floor(50 + floor * 50 + node * 10);
};

export function useBattleGame(totalRounds: number = 5) {
  const [deck, setDeck] = useState(new Deck());
  const [discardPile, setDiscardPile] = useState<Card[]>([]);
  const [hand, setHand] = useState<Card[]>([]);
  const [handValue, setHandValue] = useState(0);
  const [roundsLeft, setRoundsLeft] = useState(totalRounds);
  const [totalScore, setTotalScore] = useState(0);
  const [currentRoundScore, setCurrentRoundScore] = useState(0);
  const [roundEnded, setRoundEnded] = useState(false);
  const [battleEnded, setBattleEnded] = useState(false);
  const [didWin, setDidWin] = useState(false);
  const targetScore = calculateTargetScore(floor, currentNode);

  useEffect(() => {
    deck.shuffle();
    startNewRound();
  }, []);

  const getCardValue = (card: Card): number => {
    const val = card.getValue();
    if (typeof val === "number") return val;
    if (["J", "Q", "K"].includes(val)) return 10;
    if (val === "A") return 1; // Handle 11 during calculation below
    return 0;
  };

  const calculateHandValue = (cards: Card[]) => {
    let value = cards.reduce((sum, card) => sum + getCardValue(card), 0);
    // Handle Ace as 11 if possible
    if (cards.some(card => card.getValue() === "A") && value <= 11) {
      value += 10;
    }
    return value;
  };

  const drawCard = () => {
    const card = deck.draw();
    if (!card) return;

    const lastHandValue = calculateHandValue(hand);
    const newHand = [...hand, card];
    const handValue = calculateHandValue(newHand);

    setHand(newHand);
    setHandValue(handValue);
    const baseValue = cardBaseValues[card.getValue()] ?? 0;
    const score = calcHandScore(baseValue, lastHandValue, handValue, hand.length + 1);
    setCurrentRoundScore(currentRoundScore + score);
    setDiscardPile(prev => [...prev, card]);

    if (handValue === 21) {
      alert('Blackjack! x10');
      endRound(currentRoundScore);  // End on perfect 21
    } else if (handValue > 21) {
      endRound(0); // Bust
    }
  };

  const stay = () => {
    endRound(currentRoundScore);
  };

  const calcHandScore = (cardValue: number, lastHandValue: number, handValue: number, handLength: number) => {
    let score = cardValue;                                          // base card value
    let proximityMult = 1;                              
    if (handLength > 1) {                                           // only apply inverse if not first card of hand
        proximityMult = Math.max(1, (21 - lastHandValue) / 5);      // inverse function - higher score closer to 21
        score = Math.round(cardValue * proximityMult);
    }
    if (handValue > 21) {
        score = 0;                                                  // bust
    }
    return score;
  }

  const endRound = (score: number) => {
    let finalScore = score;
    if (handValue === 21) {
        finalScore *= 10;
    }
    setTotalScore(prev => prev + finalScore);
    setRoundEnded(true);
    setRoundsLeft(prev => prev - 1);
  };

  const startNewRound = () => {
    if (roundsLeft <= 0) return;

    setHand([]);
    setHandValue(0);
    setCurrentRoundScore(0);
    setRoundEnded(false);
  };

  const finishBattle = () => {
    setBattleEnded(true);
    setDidWin(totalScore >= targetScore);
  };

  return {
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
    gameOver: roundsLeft === 0 && roundEnded,
  };
}
