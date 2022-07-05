import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { Stage, Layer, Arrow, Circle, Line } from "react-konva";
import "./styles.css";

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

class DrawingScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawings: [],
      newDrawing: [],
      newDrawingType: "FreePathDrawing"
    };
  }

  getNewDrawingBasedOnType = (x, y, type) => {
    const drawingClasses = {
      FreePathDrawing,
      ArrowDrawing,
      CircleDrawing
    };
    return new drawingClasses[type](x, y);
  };

  handleMouseDown = (e) => {
    const { newDrawing } = this.state;
    if (newDrawing.length === 0) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const newDrawing = this.getNewDrawingBasedOnType(
        x,
        y,
        this.state.newDrawingType
      );
      this.setState({
        newDrawing: [newDrawing]
      });
    }
  };

  handleMouseUp = (e) => {
    const { newDrawing, drawings } = this.state;
    if (newDrawing.length === 1) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const drawingToAdd = newDrawing[0];
      drawingToAdd.registerMovement(x, y);
      drawings.push(drawingToAdd);
      this.setState({
        newDrawing: [],
        drawings
      });
    }
  };

  handleMouseMove = (e) => {
    const { newDrawing } = this.state;
    if (newDrawing.length === 1) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const updatedNewDrawing = newDrawing[0];
      updatedNewDrawing.registerMovement(x, y);
      this.setState({
        newDrawing: [updatedNewDrawing]
      });
    }
  };

  render() {
    const drawings = [...this.state.drawings, ...this.state.newDrawing];
    return (
      <div>
        <Stage
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          width={900}
          height={600}
        >
          <Layer>
            {React.Children.toArray(
              drawings.map((value) => {
                return value.render();
              })
            )}
          </Layer>
        </Stage>
        <button
          onClick={(e) => {
            this.setState({ newDrawingType: "FreePathDrawing" });
          }}
        >
          Draw
        </button>
        <button
          onClick={(e) => {
            this.setState({ newDrawingType: "ArrowDrawing" });
          }}
        >
          Arrow
        </button>
        <button
          onClick={(e) => {
            this.setState({ newDrawingType: "CircleDrawing" });
          }}
        >
          Circle
        </button>
      </div>
    );
  }
}

function App() {
  return <DrawingScene />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
