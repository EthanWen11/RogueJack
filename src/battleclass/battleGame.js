"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleGame = void 0;
const deck_1 = require("./deck");
const player_1 = require("./player");
const card_1 = require("./card");
class BattleGame {
    constructor() {
        this.totalValue = 0;
        this.lastCardDrawn = null;
        this.battleDeck = new deck_1.Deck([...player_1.Player.globalDeck.getDeck()]);
        this.battleDeck.shuffle();
        this.discardPile = new deck_1.Deck([]);
    }
    draw() {
        const drawnCard = this.battleDeck.popTopCard(); // Remove the top card from battleDeck
        if (drawnCard) {
            this.discardPile.addCard(drawnCard); // Add it to the discardPile
            this.totalValue += this.getCardValue(drawnCard);
        }
        return drawnCard || new card_1.Card("J", "spade"); // Return the card drawn, or a default if none
    }
    shuffleDiscard() {
        // Move all cards from discardPile to battleDeck
        this.battleDeck.addCards([...this.discardPile.getDeck()]);
        this.discardPile.clear(); // Clear discardPile
        // Shuffle battleDeck
        this.battleDeck.shuffle();
    }
    round(event) {
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
        }
        else if (event.key === "s") { // Stay
            // INSERT SCORECALCULATOR METHOD HERE
            this.totalValue = 0; // Reset total value
            this.shuffleDiscard();
            console.log("Values reset to zero.");
        }
    }
    getCardValue(card) {
        const value = card.getValue();
        if (typeof value === "number") {
            return value;
        }
        else if (value === "K" || value === "Q" || value === "J") {
            return 10; // Face card = 10
        }
        return 0; // If value is invalid
    }
}
exports.BattleGame = BattleGame;
