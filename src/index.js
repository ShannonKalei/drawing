import React from "react";
import ReactDOM from "react-dom/client";
import DrawingScene from "./components/DrawingScene";
import Header from "./components/Header";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="full-page">
      <div className="page-container">
        <Header />
        <DrawingScene />
      </div>
    </div>
  </React.StrictMode>
);
