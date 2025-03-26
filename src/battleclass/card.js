"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
class Card {
    constructor(value, suit) {
        this.id = Card.nextId++;
        this.value = value;
        this.suit = suit;
        this.modifiers = [];
    }
    getId() {
        return this.id;
    }
    getValue() {
        return this.value;
    }
    getSuit() {
        return this.suit;
    }
    addModifier(modifier) {
        if (!this.modifiers.some((mod) => mod.name === modifier.name)) {
            this.modifiers.push(modifier);
        }
    }
    applyModifiers() {
        this.modifiers.forEach(modifier => modifier.effect(this));
    }
}
exports.Card = Card;
Card.nextId = 0; // Global counter for unique IDs
