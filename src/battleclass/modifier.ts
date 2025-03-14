import { Card } from "./card"

export class Modifier {
    name: string;
    effect: (card: Card) => void;
  
    constructor(name: string, effect: (card: Card) => void) {
      this.name = name;
      this.effect = effect;
    }
  }