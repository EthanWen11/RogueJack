"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
const card_1 = require("./card");
class Deck {
    constructor(deck) {
        if (deck) {
            // If a deck is provided, use it
            this.deck = deck;
        }
        else {
            // Otherwise, create a new deck
            this.deck = this.createDeck();
        }
    }
    createDeck() {
        const suits = ["spade", "club", "heart", "diamond"];
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "K", "Q", "J"];
        const deck = [];
        // iterates over all suits and values to add one of each, default starting deck
        for (const suit of suits) {
            for (const value of values) {
                deck.push(new card_1.Card(value, suit));
            }
        }
        return deck;
    }
    getDeck() {
        return this.deck;
    }
    // Allows a deck's Card[] to be iterated over 
    [Symbol.iterator]() {
        let index = 0;
        const deck = this.deck;
        return {
            next() {
                if (index < deck.length) {
                    return { value: deck[index++], done: false };
                }
                else {
                    return { done: true, value: undefined };
                }
            }
        };
    }
    addCard(card) {
        this.deck.push(card);
    }
    addCards(cards) {
        this.deck.push(...cards);
    }
    removeCard(card) {
        const index = this.deck.findIndex(c => c.getId() === card.getId());
        if (index !== -1) {
            this.deck.splice(index, 1);
            return true;
        }
        return false;
    }
    clear() {
        this.deck = [];
    }
    isEmpty() {
        return this.deck.length === 0;
    }
    popTopCard() {
        if (!this.isEmpty()) {
            return this.deck.pop();
        }
    }
    // based on the Fisher-Yates algorithm
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
}
exports.Deck = Deck;
