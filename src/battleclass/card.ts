import { Modifier } from "./modifier"

type Suit = "spade" | "club" | "heart" | "diamond";
type Value = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "K" | "Q" | "J";

export class Card {
  value: Value;
  suit: Suit;
  modifiers: Modifier[];

  constructor(value: Value, suit: Suit) {
    this.value = value;
    this.suit = suit;
    this.modifiers = [];
  }

  addModifier(modifier: Modifier): void {
    this.modifiers.push(modifier);
  }

  applyModifiers(): void {
    this.modifiers.forEach(modifier => modifier.effect(this));
  }
}
