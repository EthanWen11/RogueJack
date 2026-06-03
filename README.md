# RogueJack
Project for CS152 
A Roguelike Deckbuilding Blackjack Game

Inspired by games like Balatro and Slay the Spire, Roguejack challenges you to increasingly difficult rounds of BlackJack. Your score each round is determined by how risky your hit; the closer you are to bust, the more points you get. Each node has a target score to beat which increases over time, requiring players to analyze when to play risky or safe to progress. Boss nodes contain modifiers that warp the field of play, and Shop nodes allow you to purchase modifiers of your own, or thin your deck to try to hit 21 more consistently. Safe strategies like double 10s are worth fewer points though, and may not be able to survive the scaling point requirements. 

Note that the current state of the game is a proof of concept. Due to time restraints the project was suspended in development. 

# Installation and Setup
1. Clone the repository and install dependencies
   ```git clone <repository-url> `
   cd roguejack
   npm install```
2. Start the development server
   ```npm run dev```
3. In a browser, navigate to [http://localhost:5173](http://localhost:5173)

# Contributors
Ethan Wen - Game Design, Game Logic, Frontend <br>
Dylan Huang - React Framework, Frontend
