import { Modifier } from "./modifier"

type Suit = "spade" | "club" | "heart" | "diamond";
type Value = "A" | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "K" | "Q" | "J";

export class Card {
  private static nextId = 0; // Global counter for unique IDs
  public readonly id: number; // Unique ID

  private value: Value;
  private suit: Suit;
  private modifiers: Modifier[];

  constructor(value: Value, suit: Suit) {
    this.id = Card.nextId++;
    this.value = value;
    this.suit = suit;
    this.modifiers = [];
  }

  public getId(): number {
    return this.id;
  }

  public getValue(): Value {
    return this.value;
  }

  public getSuit(): Suit {
    return this.suit;
  }

  public addModifier(modifier: Modifier): void {
    if (!this.modifiers.some((mod) => mod.name === modifier.name)) {
      this.modifiers.push(modifier);
    }
  }

  public applyModifiers(): void {
    this.modifiers.forEach(modifier => modifier.effect(this));
  }
}
