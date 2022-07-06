import React from "react";
import { Arrow, Circle, Ellipse, Line } from "react-konva";

class DrawingContent {
  constructor(startx, starty, fill, outline) {
    this.startx = startx;
    this.starty = starty;
    this.fill = fill;
    this.outline = outline;
  }
}

class ArrowDrawing extends DrawingContent {
  constructor(startx, starty, fill, outline) {
    super(startx, starty, fill, outline);
    this.x = startx;
    this.y = starty;
    this.fill = fill;
    this.outline = outline;
  }
  registerMovement(x, y) {
    this.x = x;
    this.y = y;
  }
  handleDragStart = e => {
    // e.evt.preventDefault();
    // console.log(e);
  };
  handleDragEnd = e => {
    // this.x = e.target.x();
    // this.y = e.target.y();
  };
  render() {
    const points = [this.startx, this.starty, this.x, this.y];
    return <Arrow draggable onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} points={points} fill={this.fill} stroke={this.outline} />;
  }
}

class CircleDrawing extends ArrowDrawing {
  constructor(startx, starty, fill, outline) {
    super(startx, starty, fill, outline);
    this.x = startx;
    this.y = starty;
    this.fill = fill;
    this.outline = outline;
  }
  render() {
    const dx = this.startx - this.x;
    const dy = this.starty - this.y;
    const radius = Math.sqrt(dx * dx + dy * dy);
    return (
      <Circle draggable onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} radius={radius} x={this.startx} y={this.starty} fill={this.fill} stroke={this.outline} />
    );
  }
}

class EllipseDrawing extends ArrowDrawing {
  constructor(startx, starty, fill, outline) {
    super(startx, starty, fill, outline);
    this.x = startx;
    this.y = starty;
    this.fill = fill;
    this.outline = outline;
  }
  render() {
    const dx = this.startx - this.x;
    const dy = this.starty - this.y;
    const radius = {x: Math.abs(dx), y: Math.abs(dy)};
    return (
      <Ellipse draggable onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} radius={radius} x={this.startx} y={this.starty} fill={this.fill} stroke={this.outline} />
    );
  }
}

class FreePathDrawing extends DrawingContent {
  constructor(startx, starty, fill, outline) {
    super(startx, starty, fill, outline);
    this.points = [startx, starty];
    this.fill = fill;
    this.outline = outline;
  }
  registerMovement(x, y) {
    this.points = [...this.points, x, y];
  }
  handleDragEnd = e => {
    this.x = e.target.x();
    this.y = e.target.y();
  };
  render() {
    return <Line draggable points={this.points} fill={this.fill} stroke={this.outline} />;
  }
}

export { DrawingContent, ArrowDrawing, CircleDrawing, EllipseDrawing, FreePathDrawing };