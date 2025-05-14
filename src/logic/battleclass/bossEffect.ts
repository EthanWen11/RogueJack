import { Card } from "./card";
import { Joker } from "./joker";
import { GameState } from "../../types/GameState";

export enum BossEffect {
  None = 0,
  NullClubs = 1,                // base value of clubs = 0
  NullDiamonds = 2,             // base value of diamonds = 0
  NullHearts = 3,               // base value of hearts = 0
  NullSpades = 4,               // base value of spades = 0
  NullFaces = 5,                // base value of face cards = 0
  Aces11 = 6,                   // aces are always calculated as 11 in hand instead of 1
  StayOn12 = 7,                 // if you have 12 or more, you MUST stay 
  DrawOn16 = 8,                 // if you have 16 or less, you MUST draw
  DisableFirstJoker = 9,        // if you have one or more jokers in your joker row, ignore the first one
  InvertDistanceFrom21 = 10,    // distanceMult is inverted, so you get more points for hitting low instead of high
}

export interface BossEffectFlags {
  faceCardsNoValue?: boolean;
  forceAceAsEleven?: boolean;
  disableHit?: boolean;
  disableStay?: boolean;
  disableFirstJoker?: boolean;
}

export function applyBossDebuffs(
  effect: BossEffect,
  card: Card | null,
  hand: Card[],
  currentScore: number,
  lastHandValue: number,
  baseValue: number,
  jokers: Joker[],
): { modifiedScore: number; flags: BossEffectFlags } {
  const flags: BossEffectFlags = {};
  let modifiedScore = currentScore;

  if (card === null) {
    console.log("No card drawn yet, applying default debuffs...");
    switch (effect) {
    case BossEffect.NullFaces:
        flags.faceCardsNoValue = true;
      break;
    case BossEffect.Aces11:
        flags.forceAceAsEleven = true;
      break;
    case BossEffect.DrawOn16: 
      flags.disableStay = true;
      break;
    case BossEffect.DisableFirstJoker:
      if (jokers.length > 0) flags.disableFirstJoker = true;
      break;
    }
    return {modifiedScore, flags};
  }

  let value = card.getValue();

  switch (effect) {
    case BossEffect.NullClubs:
      if (card.getSuit() === "club") modifiedScore = 0;
      break;
    case BossEffect.NullDiamonds:
      if (card.getSuit() === "diamond") modifiedScore = 0;
      break;
    case BossEffect.NullHearts:
      if (card.getSuit() === "heart") modifiedScore = 0;
      break;
    case BossEffect.NullSpades:
      if (card.getSuit() === "spade") modifiedScore = 0;
      break;
    case BossEffect.NullFaces:
      if (typeof value === "string" && ["J", "Q", "K"].includes(value)) {
        modifiedScore = 0;
        flags.faceCardsNoValue = true;
      break;
    }
    case BossEffect.Aces11:
      if (typeof value === "string" && ["A"].includes(value)) { 
        flags.forceAceAsEleven = true;
      break;
    }
    case BossEffect.StayOn12: {
      if (currentScore >= 12) flags.disableHit = true;
      break;
    }
    case BossEffect.DrawOn16: {
      if (currentScore <= 16) flags.disableStay = true;
      break;
    }
    case BossEffect.DisableFirstJoker:
      if (jokers.length > 0) flags.disableFirstJoker = true;
      break;
    case BossEffect.InvertDistanceFrom21: {
      const distance = Math.abs(21 - lastHandValue);
      const invertedMult = 1 + distance * 0.15; 
      modifiedScore = Math.floor(baseValue * invertedMult);
      break;
    }
    default:
      break;
  }

  return { modifiedScore, flags };
}

const getCardValue = (card: Card): number => {
    const val = card.getValue();
    if (typeof val === "number") return val;
    if (["J", "Q", "K"].includes(val)) return 10;
    if (val === "A") return 1; // Handle 11 during calculation below
    return 0;
  };

export const BossEffectDescriptions: Record<BossEffect, string> = {
  [BossEffect.None]: "No debuff.",
  [BossEffect.NullClubs]: "Clubs provide no points.",
  [BossEffect.NullDiamonds]: "Diamonds provide no points.",
  [BossEffect.NullHearts]: "Hearts provide no points.",
  [BossEffect.NullSpades]: "Spades provide no points.",
  [BossEffect.NullFaces]: "Face cards provide no points and have no value.",
  [BossEffect.Aces11]: "Aces always count as 11.",
  [BossEffect.StayOn12]: "If your score is 12 or more, you must stay.",
  [BossEffect.DrawOn16]: "If your score is 16 or less, you must draw.",
  [BossEffect.DisableFirstJoker]: "Your first Joker does nothing.",
  [BossEffect.InvertDistanceFrom21]: "You get more points the farther you are from 21.",
};