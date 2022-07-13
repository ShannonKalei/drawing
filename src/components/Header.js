import React from "react";
import ColorThemeSlider from "./ColorThemeSlider";

export default function Header() {
  return (
    <div className="flex-container space-between">
      <h1>Just a drawing app</h1>
      <ColorThemeSlider/>
    </div>
  )
}