import { Card } from "./card"

type Suit = "spade" | "club" | "heart" | "diamond";
type Value = "A" | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "K" | "Q" | "J";

export class Deck {
  private deck: Card[];

  constructor();  // No arguments - create a new deck
  constructor(deck: Card[]);  // With an existing deck of cards
  constructor(deck?: Card[]) {
    if (deck) {
      // If a deck is provided, use it
      this.deck = deck;
    } else {
      // Otherwise, create a new deck
      this.deck = this.createDeck();
    }
  }

  private createDeck(): Card[] {
    const suits: Suit[] = ["spade", "club", "heart", "diamond"];
    const values: Value[] = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "K", "Q", "J"];
    const deck: Card[] = [];
  
    // iterates over all suits and values to add one of each, default starting deck
    for (const suit of suits) {
      for (const value of values) {
        deck.push(new Card(value, suit));
      }
    }
  
    return deck;
  }

  public getDeck(): Card[] {
    return this.deck;
  }

  // Allows a deck's Card[] to be iterated over 
  [Symbol.iterator](): Iterator<Card> {
    let index = 0;
    const deck = this.deck;
    return {
      next(): IteratorResult<Card> {
        if (index < deck.length) {
          return { value: deck[index++], done: false };
        } else {
          return { done: true, value: undefined };
        }
      }
    };
  }

  public addCard(card: Card): void {
    this.deck.push(card);
  }

  public addCards(cards: Card[]): void {
    this.deck.push(...cards);
  }

  public removeCard(card: Card): boolean {
    const index = this.deck.findIndex(c => c.getId() === card.getId());
    if (index !== -1) {
      this.deck.splice(index, 1);
      return true;
    }
    return false;
  }

  public clear(): void {
    this.deck = [];
  }

  isEmpty(): boolean {
    return this.deck.length === 0;
  }

  public draw(): Card | undefined {
    if (!this.isEmpty()) {
      return this.deck.pop();
    } 
  }

  // based on the Fisher-Yates algorithm
  public shuffle(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  clone(): Deck {
    const newDeck = new Deck();
    newDeck.deck = [...this.deck]; 
    return newDeck;
  }
}
