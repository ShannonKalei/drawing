import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { Stage, Layer } from "react-konva";
import {
  ArrowDrawing,
  CircleDrawing,
  EllipseDrawing,
  FreePathDrawing,
  SquareDrawing,
  PolygonDrawing
} from "./components/DrawingContent";
import DrawingToolbar from "./components/DrawingToolbar";
import ColorPicker from "./components/ColorPicker";
import "./styles.css";

class DrawingScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawings: [],
      newDrawing: [],
      newDrawingType: "FreePathDrawing",
      fill: "#aaccee44",
      stroke: "#aacceeff",
      selectedTool: "drawing",
      isDraggable: false,
      polygonSides: 5
    };
  }

  getNewDrawingBasedOnType = (x, y, type) => {
    const drawingClasses = {
      FreePathDrawing,
      ArrowDrawing,
      CircleDrawing,
      EllipseDrawing,
      SquareDrawing,
      PolygonDrawing
    };
    return new drawingClasses[type](
      x,
      y,
      this.state.fill,
      this.state.stroke,
      this.state.isDraggable,
      this.state.polygonSides
    );
  };

  handleMouseDown = (e) => {
    if (this.state.selectedTool === "drawing") {
      this.setState({ selectedTool: "drawing" });
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
      }
    }
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
    if (toolSelection === "move") {
      this.setState({ isDraggable: true });
    }
  };

  handleDrawingSelection = (drawingSelection) => {
    this.setState({ selectedTool: "drawing", isDraggable: false });
    this.setState({ newDrawingType: drawingSelection });
  };

  updateColorSelection = (colorSelection, colorTarget) => {
    if (colorTarget === "stroke") this.setState({ stroke: colorSelection });
    if (colorTarget === "fill") this.setState({ fill: colorSelection });
  }

  handlePolygonSides = (sides) => {
    this.setState({ polygonSides: sides });
  }

  render() {
    const drawings = [...this.state.drawings, ...this.state.newDrawing];
    const canvasWidth = document.body.clientWidth;
    return (
      <div>
        <Stage
          className="drawing-canvas"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          width={canvasWidth}
          height={600}
        >
          <Layer>
            {React.Children.toArray(
              drawings.map((value) => {
                value.isDraggable = this.state.isDraggable;
                return value.render();
              })
            )}
          </Layer>
        </Stage>
        <DrawingToolbar
          handleDrawingSelection={this.handleDrawingSelection}
          handleToolbarSelection={this.handleToolbarSelection}
          handlePolygonSides={this.handlePolygonSides}
          polygonSides={this.state.polygonSides}
          drawingType={this.state.newDrawingType}
          currentTool={this.state.selectedTool}
        />
        <div className="flex-container">
          <h1>Stroke</h1>
          <ColorPicker colorTarget={"stroke"} updateColorSelection={this.updateColorSelection}/>
          <h1>Fill</h1>
          <ColorPicker colorTarget={"fill"} updateColorSelection={this.updateColorSelection}/>
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DrawingScene />
  </React.StrictMode>
);
