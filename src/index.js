import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { Stage, Layer } from "react-konva";
import { ArrowDrawing, CircleDrawing, EllipseDrawing, FreePathDrawing } from "./components/DrawingContent";
import "./styles.css";

class DrawingScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawings: [],
      newDrawing: [],
      newDrawingType: "FreePathDrawing",
      fill: "#ff00ff44",
      outline: "#ff00ffff"
    };
  }

  getNewDrawingBasedOnType = (x, y, type) => {
    const drawingClasses = {
      FreePathDrawing,
      ArrowDrawing,
      CircleDrawing,
      EllipseDrawing
    };
    return new drawingClasses[type](x, y, this.state.fill, this.state.outline);
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
          <span className="material-icons">edit</span>
          <span className="button-text">Draw</span>
        </button>
        <button
          onClick={(e) => {
            this.setState({ newDrawingType: "ArrowDrawing" });
          }}
        >
          <span className="material-icons">north_east</span>
          <span className="button-text">Arrow</span>
        </button>
        <button
          onClick={(e) => {
            this.setState({ newDrawingType: "CircleDrawing" });
          }}
        >
          <span className="material-icons">circle</span>
          <span className="button-text">Circle</span>
        </button>
        <button
          onClick={(e) => {
            this.setState({ newDrawingType: "EllipseDrawing" });
          }}
        >
          <span className="material-icons">circle</span>
          <span className="button-text">Ellipse</span>
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
