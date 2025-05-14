import { ShopGame } from '../battleclass/shopGame'; 
import { Player } from '../battleclass/player'; 
import * as readline from 'readline';

// Initialize readline for continuous input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class ShopMenu {
  private player: Player;
  private shopGame: ShopGame;

  constructor() {
    this.player = new Player();  
    this.shopGame = new ShopGame(); 
  }

  // Method to start the combat menu and listen for input
  public start(): void {
    console.log("Shop Menu Started!");
    // console.log("Your currency is:" + this.player.currency);

    // Start the round listening loop
    rl.on('line', (input: string) => {
      if (input === "q") {
        console.log("Quitting the game...");
        rl.close(); // Quit the game
      } else {
        // this.shopGame.round({ key: input } as KeyboardEvent);
      }
    });
  }
}

// Instantiate and start the CombatMenu
const shopMenu = new ShopMenu();
shopMenu.start();