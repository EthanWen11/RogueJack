// src/menuclass/mapMenu.ts

import { Router } from 'express';
import { getGameState, startNewGame, advanceNode } from './gameState';

// Create the Router instance
const mapMenuRouter = Router();

// API route to get map nodes
mapMenuRouter.get('/map', (req, res) => {
  try {
    // Get game state and send map nodes
    const gameState = getGameState();
    res.json({ nodes: gameState.map });
  } catch (error) {
    console.error("Error fetching map nodes:", error);
    res.status(500).json({ error: 'Failed to fetch map nodes' });
  }
});

// API route to start a new game
mapMenuRouter.get('/start', (req, res) => {
  try {
    // Start a new game
    startNewGame();
    res.json({ message: 'New game started successfully!' });
  } catch (error) {
    console.error("Error starting a new game:", error);
    res.status(500).json({ error: 'Failed to start a new game' });
  }
});

// API route to advance a node
mapMenuRouter.get('/advance', (req, res) => {
  try {
    // Advance the current node
    advanceNode();
    const gameState = getGameState(); // Get updated game state after advancing
    res.json(gameState); // Respond with the updated game state
  } catch (error) {
    console.error("Error advancing node:", error);
    res.status(500).json({ error: 'Failed to advance node' });
  }
});


console.log("mapMenuRouter export:", mapMenuRouter);  // Check the export
// Export the router to be used in the main server file
export { mapMenuRouter };
