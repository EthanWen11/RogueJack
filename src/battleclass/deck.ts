import { Card } from "./card"

type Suit = "spade" | "club" | "heart" | "diamond";
type Value = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "K" | "Q" | "J";

export class Deck {
  deck: Card[];

  constructor() {
    this.deck = this.createDeck();
  }

  private createDeck(): Card[] {
    const suits: Suit[] = ["spade", "club", "heart", "diamond"];
    const values: Value[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "K", "Q", "J"];
    const deck: Card[] = [];
  
    for (const suit of suits) {
      for (const value of values) {
        deck.push(new Card(value, suit));
      }
    }
  
    return deck;
  }

  private addCard(card: Card): void {
      this.deck.push(card);
    }

  private removeCard(card: Card): boolean {
        // 
        return false;
      }

  shuffle(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }
}
