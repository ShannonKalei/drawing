import React from "react";
import ReactDOM from "react-dom/client";
import DrawingScene from "./components/DrawingScene";
import ColorThemeSlider from "./components/ColorThemeSlider"
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ColorThemeSlider />
    <DrawingScene />
  </React.StrictMode>
);
