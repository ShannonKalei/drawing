import React from "react";
import { Arrow, Circle, Line } from "react-konva";

class DrawingContent {
  constructor(startx, starty) {
    this.startx = startx;
    this.starty = starty;
  }
}

class ArrowDrawing extends DrawingContent {
  constructor(startx, starty) {
    super(startx, starty);
    this.x = startx;
    this.y = starty;
  }
  registerMovement(x, y) {
    this.x = x;
    this.y = y;
  }
  render() {
    const points = [this.startx, this.starty, this.x, this.y];
    return <Arrow points={points} fill="#0000ffaa" stroke="#00aaffff" />;
  }
}

class CircleDrawing extends ArrowDrawing {
  constructor(startx, starty) {
    super(startx, starty);
    this.x = startx;
    this.y = starty;
  }
  render() {
    const dx = this.startx - this.x;
    const dy = this.starty - this.y;
    const radius = Math.sqrt(dx * dx + dy * dy);
    return (
      <Circle radius={radius} x={this.startx} y={this.starty} fill="#ff00ff44" stroke="#ff00ffff" />
    );
  }
}

class FreePathDrawing extends DrawingContent {
  constructor(startx, starty) {
    super(startx, starty);
    this.points = [startx, starty];
  }
  registerMovement(x, y) {
    this.points = [...this.points, x, y];
  }
  render() {
    return <Line points={this.points} fill="black" stroke="black" />;
  }
}

export { DrawingContent, ArrowDrawing, CircleDrawing, FreePathDrawing };