import { Deck } from "./deck";
import { Joker } from "./joker";

export class Player {
  public globalDeck: Deck;
  public jokerArray: Joker[];

  constructor() {
    this.globalDeck = new Deck();
    this.jokerArray = [];
  }

  public addJoker(joker: Joker): void {
    this.jokerArray.push(joker);
  }

  public getJokers(): Joker[] {
    return this.jokerArray;
  }

  public cloneDeck(): Deck {
    return this.globalDeck.clone(); // See below
  }
}
