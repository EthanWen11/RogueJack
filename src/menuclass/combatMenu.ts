import { BattleGame } from '../battleclass/battleGame'; 
import { Player } from '../battleclass/player'; 
import * as readline from 'readline';

// Initialize readline for continuous input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class CombatMenu {
  private player: Player;
  private battleGame: BattleGame;

  constructor() {
    this.player = new Player();  
    this.battleGame = new BattleGame(); 
  }

  // Method to start the combat menu and listen for input
  public start(): void {
    console.log("Combat Menu Started!");
    console.log("Press 'h' to hit, 's' to stay, or 'q' to quit.");

    // Start the round listening loop
    rl.on('line', (input: string) => {
      if (input === "q") {
        console.log("Quitting the game...");
        rl.close(); // Quit the game
      } else {
        this.battleGame.round({ key: input } as KeyboardEvent);
      }
    });
  }
}

// Instantiate and start the CombatMenu
const combatMenu = new CombatMenu();
combatMenu.start();