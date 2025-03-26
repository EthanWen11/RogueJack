"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const battleGame_1 = require("../battleclass/battleGame");
const player_1 = require("../battleclass/player");
const readline = __importStar(require("readline"));
// Initialize readline for continuous input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class CombatMenu {
    constructor() {
        this.player = new player_1.Player();
        this.battleGame = new battleGame_1.BattleGame();
    }
    // Method to start the combat menu and listen for input
    start() {
        console.log("Combat Menu Started!");
        console.log("Press 'h' to hit, 's' to stay, or 'q' to quit.");
        // Start the round listening loop
        rl.on('line', (input) => {
            if (input === "q") {
                console.log("Quitting the game...");
                rl.close(); // Quit the game
            }
            else {
                this.battleGame.round({ key: input });
            }
        });
    }
}
// Instantiate and start the CombatMenu
const combatMenu = new CombatMenu();
combatMenu.start();
