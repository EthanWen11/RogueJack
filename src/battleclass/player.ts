import { Deck } from "./deck"
import { Joker } from "./joker"

export class Player {
  public static globalDeck: Deck; 
  private jokerArray: Joker[];

  constructor() {
    Player.globalDeck = new Deck();
    this.jokerArray = [];
  }

  public addJoker(joker: Joker): void {
    this.jokerArray.push(joker);
  }
}