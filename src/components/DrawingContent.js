import React from "react";
import { Arrow, Circle, Ellipse, Line, RegularPolygon } from "react-konva";

class DrawingContent {
  constructor(startx, starty, fill, stroke, isDraggable, polygonSides) {
    this.startx = startx;
    this.starty = starty;
    this.fill = fill;
    this.stroke = stroke;
    this.isDraggable = isDraggable;
    this.polygonSides = polygonSides;
  }
}

class ArrowDrawing extends DrawingContent {
  constructor(startx, starty, fill, stroke, isDraggable) {
    super(startx, starty, fill, stroke, isDraggable);
    this.x = startx;
    this.y = starty;
    this.fill = fill;
    this.stroke = stroke;
    this.isDraggable = isDraggable;
  }
  registerMovement(x, y) {
    this.x = x;
    this.y = y;
  }
  render() {
    const points = [this.startx, this.starty, this.x, this.y];
    return (
      <Arrow
        className="drawing drawing-arrow"
        style={{ pointerEvents: "none" }}
        draggable={this.isDraggable}
        onDragStart={(e) => e.evt.preventDefault()}
        onDragEnd={(e) => e.evt.preventDefault()}
        points={points}
        fill={this.fill}
        stroke={this.stroke}
      />
    );
  }
}

class CircleDrawing extends ArrowDrawing {
  constructor(startx, starty, fill, stroke, isDraggable) {
    super(startx, starty, fill, stroke, isDraggable);
    this.x = startx;
    this.y = starty;
    this.fill = fill;
    this.stroke = stroke;
    this.isDraggable = isDraggable;
  }
  render() {
    const dx = this.startx - this.x;
    const dy = this.starty - this.y;
    const radius = Math.sqrt(dx * dx + dy * dy);
    return (
      <Circle
        className="drawing drawing-circle"
        draggable={this.isDraggable}
        onDragStart={(e) => e.evt.preventDefault()}
        onDragEnd={(e) => e.evt.preventDefault()}
        radius={radius}
        x={this.startx}
        y={this.starty}
        fill={this.fill}
        stroke={this.stroke}
      />
    );
  }
}

class EllipseDrawing extends ArrowDrawing {
  constructor(startx, starty, fill, stroke, isDraggable) {
    super(startx, starty, fill, stroke, isDraggable);
    this.x = startx;
    this.y = starty;
    this.fill = fill;
    this.stroke = stroke;
    this.isDraggable = isDraggable;
  }
  render() {
    const dx = this.startx - this.x;
    const dy = this.starty - this.y;
    const radius = { x: Math.abs(dx), y: Math.abs(dy) };
    return (
      <Ellipse
        className="drawing drawing-ellipse"
        draggable={this.isDraggable}
        onDragStart={(e) => e.evt.preventDefault()}
        onDragEnd={(e) => e.evt.preventDefault()}
        radius={radius}
        x={this.startx}
        y={this.starty}
        fill={this.fill}
        stroke={this.stroke}
      />
    );
  }
}

class SquareDrawing extends ArrowDrawing {
  constructor(startx, starty, fill, stroke, isDraggable) {
    super(startx, starty, fill, stroke, isDraggable);
    this.x = startx;
    this.y = starty;
    this.fill = fill;
    this.stroke = stroke;
    this.isDraggable = isDraggable;
  }
  render() {
    const dx = this.startx - this.x;
    const dy = this.starty - this.y;
    const radius = Math.sqrt(dx * dx + dy * dy);
    return (
      <RegularPolygon
        className="drawing drawing-circle"
        draggable={this.isDraggable}
        onDragStart={(e) => e.evt.preventDefault()}
        onDragEnd={(e) => e.evt.preventDefault()}
        radius={radius}
        rotation={45}
        sides={4}
        x={this.startx}
        y={this.starty}
        fill={this.fill}
        stroke={this.stroke}
      />
    );
  }
}

class PolygonDrawing extends ArrowDrawing {
  constructor(startx, starty, fill, stroke, isDraggable, polygonSides) {
    super(startx, starty, fill, stroke, isDraggable, polygonSides);
    this.x = startx;
    this.y = starty;
    this.fill = fill;
    this.stroke = stroke;
    this.isDraggable = isDraggable;
    this.polygonSides = polygonSides;
  }
  render() {
    const dx = this.startx - this.x;
    const dy = this.starty - this.y;
    const radius = Math.sqrt(dx * dx + dy * dy);

    // TODO: figure out this math better  
    const offset = 1.73; 
    const scaleX = (offset*dx)/radius || 0;
    const scaleY = (offset*dy)/radius || 0;
    return (
      <RegularPolygon
        className="drawing drawing-circle"
        draggable={this.isDraggable}
        onDragStart={(e) => e.evt.preventDefault()}
        onDragEnd={(e) => e.evt.preventDefault()}
        radius={radius}
        sides={this.polygonSides}
        x={this.startx}
        y={this.starty}
        scaleX={scaleX}
        scaleY={scaleY}
        fill={this.fill}
        stroke={this.stroke}
      />
    );
  }
}

class FreePathDrawing extends DrawingContent {
  constructor(startx, starty, fill, stroke, isDraggable) {
    super(startx, starty, fill, stroke,isDraggable);
    this.points = [startx, starty];
    this.fill = fill;
    this.stroke = stroke;
    this.isDraggable = isDraggable;
  }
  registerMovement(x, y) {
    this.points = [...this.points, x, y];
  }
  render() {
    return (
      <Line
        className="drawing drawing-free-path"
        draggable={this.isDraggable}
        points={this.points}
        fill={this.fill}
        stroke={this.stroke}
      />
    );
  }
}

export {
  DrawingContent,
  ArrowDrawing,
  CircleDrawing,
  EllipseDrawing,
  SquareDrawing,
  PolygonDrawing,
  FreePathDrawing,
};
