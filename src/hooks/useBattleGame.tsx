import { useState, useEffect } from "react";
import { Card } from "../logic/battleclass/card";
import { Deck } from "../logic/battleclass/deck";
import { useGameContext } from "../context/GameContext";
import { BossEffect, applyBossDebuffs, BossEffectDescriptions } from "../logic/battleclass/bossEffect";
import { Player } from "../logic/battleclass/player";
import { player } from "../types/GameState";

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

export function useBattleGame(totalRounds: number = 5) {
  const { gameState } = useGameContext(); 
  const { floor, nodesCompletedThisFloor } = gameState;
  const currentNode = gameState.map?.nodes[gameState.currentNode];
  const isBoss = currentNode?.type === "boss";

  const calculateTargetScore = (floor: number, nodesCompletedThisFloor: number) => {
    return Math.floor(50 + floor * 50 + (nodesCompletedThisFloor - 1) * 10);
  };

  const [deck, setDeck] = useState<Deck | null>(null);
  const [discardPile, setDiscardPile] = useState<Card[]>([]);
  const [hand, setHand] = useState<Card[]>([]);
  const [handValue, setHandValue] = useState(0);
  const [roundsLeft, setRoundsLeft] = useState(totalRounds);
  const [totalScore, setTotalScore] = useState(0);
  const [currentRoundScore, setCurrentRoundScore] = useState(0);
  const [roundEnded, setRoundEnded] = useState(false);
  const [battleEnded, setBattleEnded] = useState(false);
  const [didWin, setDidWin] = useState(false);

  const [bossEffect, setBossEffect] = useState<BossEffect>(BossEffect.None);
  const [debuffMessage, setDebuffMessage] = useState<string>("");
  const [faceCardsNoValue, setFaceCardsNoValue] = useState(false);
  const [forceAceAsEleven, setForceAceAsEleven] = useState(false);
  const [disableHit, setHitDisabled] = useState(false);
  const [disableStay, setStayDisabled] = useState(false);
  const [disableFirstJoker, setFirstJokerDisabled] = useState(false);

  const targetScore = calculateTargetScore(floor, nodesCompletedThisFloor);
  
  useEffect(() => {
    if (isBoss) {
      // Select random boss effect (1-10)
      const randomEffect = Math.floor(Math.random() * 10) + 1;
      const newBossEffect = randomEffect as BossEffect;
      setBossEffect(newBossEffect);

      // Apply default debuff flags
      const debuffResult = applyBossDebuffs(newBossEffect, null, [], 0, 0, 0, player.getJokers());
      setDebuffMessage(BossEffectDescriptions[newBossEffect]); 
      
      if (debuffResult.flags.faceCardsNoValue) {
        setFaceCardsNoValue(true); 
      }
      if (debuffResult.flags.forceAceAsEleven) {
        setForceAceAsEleven(true); 
      }
      if (debuffResult.flags.disableStay) {
        setStayDisabled(true); 
      }
      if (debuffResult.flags.disableFirstJoker) {
        setFirstJokerDisabled(true); 
      }
    }
    const combatDeck = player.cloneDeck();
    combatDeck.shuffle(); 
    setDeck(combatDeck);
    startNewRound();
  }, []); 

  useEffect(() => {
  if (roundsLeft === 0 && roundEnded && !battleEnded) {
    finishBattle();
  }}, [roundsLeft, roundEnded, battleEnded]);

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
    if (!deck || deck.isEmpty()) return;
    const card = deck.draw();
    if (!card) return;

    const lastHandValue = calculateHandValue(hand);
    const newHand = [...hand, card];
    const handValue = calculateHandValue(newHand);

    setHand(newHand);
    setHandValue(handValue);
    const baseValue = cardBaseValues[card.getValue()] ?? 0;
    let score = calcHandScore(baseValue, lastHandValue, handValue, hand.length + 1);

    if (isBoss) {
        const debuffResult = applyBossDebuffs(bossEffect, card, newHand, score, lastHandValue, baseValue, player.getJokers());
        score = debuffResult.modifiedScore;
    }

    // if ()
    // const jokerResult = applyJokers();

    setCurrentRoundScore(prev => prev + score);
    setDiscardPile(prev => [...prev, card]);

    if (handValue === 21) {
      alert('Blackjack! x10');
      endRound(currentRoundScore * 10);  // Bonus and end early on perfect 21
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
    setTotalScore(prev => prev + score);
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
    bossEffect,
    debuffMessage,
  };
}
