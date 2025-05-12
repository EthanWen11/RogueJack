// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GameProvider } from "./context/GameContext"; // Import the GameProvider
import App from "./App"; // Import your App component

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GameProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GameProvider>
  </React.StrictMode>
);
