import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { Stage, Layer } from "react-konva";
import {
  ArrowDrawing,
  CircleDrawing,
  EllipseDrawing,
  FreePathDrawing,
} from "./components/DrawingContent";
import DrawingToolbar from "./components/DrawingToolbar";
import "./styles.css";

class DrawingScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawings: [],
      newDrawing: [],
      newDrawingType: "FreePathDrawing",
      fill: "#ff00ff44",
      outline: "#ff00ffff",
      selectedTool: "drawing",
    };
  }

  getNewDrawingBasedOnType = (x, y, type) => {
    const drawingClasses = {
      FreePathDrawing,
      ArrowDrawing,
      CircleDrawing,
      EllipseDrawing,
    };
    return new drawingClasses[type](x, y, this.state.fill, this.state.outline);
  };

  handleMouseDown = (e) => {
    if (this.state.selectedTool === "drawing") {
      this.setState({ selectedTool: "drawing" });
      e.target.attrs.draggable = false;
      //console.log("drawings: ", this.state.drawings);
      const { newDrawing } = this.state;
      if (newDrawing.length === 0) {
        const { x, y } = e.target.getStage().getPointerPosition();
        const newDrawing = this.getNewDrawingBasedOnType(
          x,
          y,
          this.state.newDrawingType
        );
        this.setState({
          newDrawing: [newDrawing],
        });
      }
    } else if (this.state.selectedTool === "move") {
      e.target.attrs.draggable = true;
      //console.log("mouse down: ", e.target);
    }
  };

  handleMouseUp = (e) => {
    if (this.state.selectedTool === "drawing") {
      const { newDrawing, drawings } = this.state;
      if (newDrawing.length === 1) {
        const { x, y } = e.target.getStage().getPointerPosition();
        const drawingToAdd = newDrawing[0];
        drawingToAdd.registerMovement(x, y);
        drawings.push(drawingToAdd);
        this.setState({
          newDrawing: [],
          drawings,
        });
      } else if (this.state.selectedTool === "move") {
        // e.target.attrs.draggable = false;
        //console.log("mouse up: ", e.target);
      }
    }
    // console.log("drawings: ", this.state.drawings);
  };

  handleMouseMove = (e) => {
    if (this.state.selectedTool === "drawing") {
      const { newDrawing } = this.state;
      if (newDrawing.length === 1) {
        const { x, y } = e.target.getStage().getPointerPosition();
        const updatedNewDrawing = newDrawing[0];
        updatedNewDrawing.registerMovement(x, y);
        this.setState({
          newDrawing: [updatedNewDrawing],
        });
      }
    }
  };

  handleToolbarSelection = (toolSelection) => {
    this.setState({ selectedTool: toolSelection });
  };

  handleDrawingSelection = (drawingSelection) => {
    this.setState({ selectedTool: "drawing" });
    this.setState({ newDrawingType: drawingSelection });
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
          draggable={false}
        >
          <Layer draggable={false}>
            {React.Children.toArray(
              drawings.map((value) => {
                return value.render();
              })
            )}
          </Layer>
        </Stage>
        <DrawingToolbar
          handleDrawingSelection={this.handleDrawingSelection}
          handleToolbarSelection={this.handleToolbarSelection}
        />
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
