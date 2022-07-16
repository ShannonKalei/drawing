import React, { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import hexToRGBA from "../utils/hexToRGBA";
import checkerboard from "../assets/checkerboard.png";

export default function ColorPicker(props) {
  const [color, setColor] = useState(props.startColor);
  const [alpha, setAlpha] = useState(props.startAlpha);
  const [rgbaColor, setRgbaColor] = useState(hexToRGBA(color));

  const colorSelection = (selectedColor) => {
    setRgbaColor(hexToRGBA(selectedColor));
    setColor(selectedColor);
    props.updateColorSelection(selectedColor, props.colorTarget);
  }

  const checkForAlphaSelection = (selectedColor) => {
    let hexAlpha;
    let workingAlpha;
    switch (selectedColor.length) {
      // Cases without alpha assume 100
      case 4:
      case 7:
        setAlpha(100);
        break;
      // Cases with alpha
      case 5:
        hexAlpha = selectedColor.slice(-1, selectedColor.length);
        workingAlpha = parseInt(hexAlpha, 16);
        setAlpha(workingAlpha);
        break;
      case 9:
        hexAlpha = selectedColor.slice(-2, selectedColor.length);
        workingAlpha = parseInt(hexAlpha, 16);
        setAlpha(workingAlpha);
        break;
      default:
        // No update required
    }
  }

  const handleAlphaSelection = (alpha, newColor) => {
    setAlpha(alpha);
    const workingAlpha = Math.floor((alpha / 100) * 255);
    const hexAlpha = workingAlpha.toString(16).padStart(2, 0);
    let nextColor = newColor ? newColor : color;
    switch (nextColor.length) {
      // Cases without alpha
      case 4:
        nextColor = newColor
          ? newColor.concat(hexAlpha[0])
          : color.concat(hexAlpha[0]);
        setColor(nextColor);
        break;
      case 7:
        nextColor = newColor 
          ? newColor.concat(hexAlpha) 
          : color.concat(hexAlpha);
        setColor(nextColor);
        break;
      // Cases already containing alpha
      case 5:
        nextColor = newColor 
          ? newColor.slice(0, -1).concat(hexAlpha[0])
          : color.slice(0, -1).concat(hexAlpha[0]);
        setColor(nextColor);
        break;
      case 9:
        nextColor = newColor
          ? newColor.slice(0, -2).concat(hexAlpha)
          : color.slice(0, -2).concat(hexAlpha);
        setColor(nextColor);
        break;
      default:
        // Invalid hex?
    }
    colorSelection(nextColor);
  }

  return (
    <div className="color-picker">
      <HexColorPicker
        color={color}
        onChange={(value) => {
          handleAlphaSelection(alpha, value);
        }}
      />
      <input 
        id="alpha-slider"
        type="range"
        min="0"
        max="100"
        step="1"
        value={alpha}
        onChange={e => handleAlphaSelection(e.target.value)}
        style={{ 
          background: `linear-gradient(to right, rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, 0), rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, 1)), url(${checkerboard})` 
        }}
      />
      <HexColorInput 
        className="color-picker-input"
        color={color}
        onChange={(value) => {
          checkForAlphaSelection(value);
          colorSelection(value);
        }}
        prefixed
        alpha
      />
    </div>
  );
}