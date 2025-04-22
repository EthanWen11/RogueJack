import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Assuming App is in the same directory

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
