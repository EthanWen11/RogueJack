import { Deck } from "./deck"
import { Player } from "./player"
import { Card } from "./card"

export class ShopGame {
  private totalValue: number = 0;
  private lastCardDrawn: Card | null = null;

  constructor() {
  }

  public round(event: KeyboardEvent): void {
    if (event.key === "1") { // Hit
      console.log("You pressed 1!")
    } else if (event.key === "2") { // Stay
      console.log("You pressed 2!")
    }
  }

}