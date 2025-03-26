"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const deck_1 = require("./deck");
class Player {
    constructor() {
        Player.globalDeck = new deck_1.Deck();
        this.jokerArray = [];
    }
    addJoker(joker) {
        this.jokerArray.push(joker);
    }
}
exports.Player = Player;
