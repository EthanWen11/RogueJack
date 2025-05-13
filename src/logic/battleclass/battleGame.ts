import { Deck } from "./deck"
import { Player } from "./player"
import { Card } from "./card"

export class BattleGame {
  private battleDeck: Deck;
  private discardPile: Deck;
  private totalValue: number = 0;
  private lastCardDrawn: Card | null = null;

  constructor() {
    this.battleDeck = new Deck([...Player.globalDeck.getDeck()]);
    this.battleDeck.shuffle();
    this.discardPile = new Deck([]);
  }

  public draw(): Card {
    const drawnCard = this.battleDeck.draw(); // Remove the top card from battleDeck
    if (drawnCard) {
      this.discardPile.addCard(drawnCard); // Add it to the discardPile
      this.totalValue += this.getCardValue(drawnCard);
    }
    return drawnCard || new Card("J", "spade"); // Return the card drawn, or a default if none
  }

  public shuffleDiscard(): void {
    // Move all cards from discardPile to battleDeck
    this.battleDeck.addCards([...this.discardPile.getDeck()]);
    this.discardPile.clear(); // Clear discardPile

    // Shuffle battleDeck
    this.battleDeck.shuffle();
  }

  public round(event: KeyboardEvent): void {
    if (event.key === "h") { // Hit
      const drawnCard = this.draw();
      if (this.totalValue > 21) {
        console.log(`Bust!`);
        this.totalValue = 0;
        this.shuffleDiscard();
        console.log("Values reset to zero.");
        return;
      }
      this.lastCardDrawn = drawnCard; // Update last card drawn
      console.log(`Last card drawn: ${drawnCard.getValue()} of ${drawnCard.getSuit()}`);
      console.log(`Total value of cards drawn: ${this.totalValue}`);
    } else if (event.key === "s") { // Stay
      // INSERT SCORECALCULATOR METHOD HERE
      this.totalValue = 0; // Reset total value
      this.shuffleDiscard();
      console.log("Values reset to zero.");
    }
  }

  // May need to revamp this entirely
  // To determine whether an Ace should be 1 or 11,
  // calculate TotalValue from the cards in DiscardPile?
  private getCardValue(card: Card): number {
    const value = card.getValue(); 
    if (typeof value === "number") {
      return value;
    } else if (value === "K" || value === "Q" || value === "J") {
      return 10; // Face card = 10
    }
    return 0; // If value is invalid
  }

}