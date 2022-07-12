import React from "react";
import ReactDOM from "react-dom/client";
import DrawingScene from "./components/DrawingScene";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DrawingScene />
  </React.StrictMode>
);
