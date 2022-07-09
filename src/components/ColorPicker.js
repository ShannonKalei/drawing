import React, { useState } from "react";
import { HexColorPicker, HexColorInput, AlphaColorPicker } from "react-colorful";

export default function ColorPicker(props) {
  const [color, setColor] = useState("#aaccee");

  const colorSelection = (selectedColor) => {
    setColor(selectedColor);
    props.updateColorSelection(selectedColor, props.colorTarget);
  }

  return (
    <div className="color-picker">
      <HexColorPicker
        color={color}
        onChange={(value) => colorSelection(value)}
      />
      <HexColorInput 
        color={color}
        onChange={(value) => colorSelection(value)}
        prefixed
        alpha
      />
    </div>
  );
}