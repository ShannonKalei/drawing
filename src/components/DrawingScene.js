import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import {
  ArrowDrawing,
  CircleDrawing,
  EllipseDrawing,
  FreePathDrawing,
  SquareDrawing,
  PolygonDrawing
} from "./DrawingContent";
import DrawingToolbar from "./DrawingToolbar";
import ColorPicker from "./ColorPicker";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const colorRegexp = /\d+/g;

  // React.StrictMode workaround for double render in development
  let ignore = false;

export default class DrawingScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawings: [],
      newDrawing: [],
      newDrawingType: "FreePathDrawing",
      fill: "#aaccee44",
      stroke: "#aacceeff",
      strokeWidth: 3,
      selectedTool: "drawing",
      isDraggable: false,
      polygonSides: 5
    };
  }

  componentDidMount() {
    // Accessibility add-ins for components from external libraries
    const reactColorfulInteractives = document.getElementsByClassName("react-colorful__interactive");
    const reactColorfulInputs = document.getElementsByClassName("color-picker-input");
    for (let i = 0; i < reactColorfulInteractives.length; i++) {
      if (reactColorfulInteractives[i].ariaLabel === 'Hue') {
        reactColorfulInteractives[i].setAttribute('aria-valuemin', 0);
        reactColorfulInteractives[i].setAttribute('aria-valuemax', 360);
        reactColorfulInteractives[i].setAttribute('aria-valuenow', reactColorfulInteractives[i].getAttribute('aria-valuetext'));
      }

      if (reactColorfulInteractives[i].ariaLabel === 'Color') {
        reactColorfulInteractives[i].setAttribute('aria-valuemin', 0);
        reactColorfulInteractives[i].setAttribute('aria-valuemax', 100);

        const value = reactColorfulInteractives[i].getAttribute('aria-valuetext');
        const valueArray = [...value.matchAll(colorRegexp)];
        reactColorfulInteractives[i].setAttribute('aria-valuenow', parseInt(valueArray[0]));
      }
    }

    if (!ignore) {
      for (let k = 0; k < reactColorfulInputs.length; k++) {
        let label = document.createElement("label");
        label.setAttribute('for', reactColorfulInputs[k].getAttribute('id'));
        label.textContent = 'Hex color input';
        reactColorfulInputs[k].parentNode.insertBefore(label, reactColorfulInputs[k]);
      }
      ignore = true;
    }
  }

  componentDidUpdate() {
    // Accessibility add-ins for components from external libraries
    const reactColorfulInteractives = document.getElementsByClassName("react-colorful__interactive");
    for (let i = 0; i < reactColorfulInteractives.length; i++) {
      if (reactColorfulInteractives[i].ariaLabel === 'Hue') {
        reactColorfulInteractives[i].setAttribute('aria-valuenow', reactColorfulInteractives[i].getAttribute('aria-valuetext'));
      }

      if (reactColorfulInteractives[i].ariaLabel === 'Color') {
        const value = reactColorfulInteractives[i].getAttribute('aria-valuetext');
        const valueArray = [...value.matchAll(colorRegexp)];
        reactColorfulInteractives[i].setAttribute('aria-valuenow', parseInt(valueArray[0]));
      }
    }
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
      this.state.strokeWidth,
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

  handleStrokeWidth = (width) => {
    this.setState({ strokeWidth: width });
  }

  handlePolygonSides = (sides) => {
    this.setState({ polygonSides: sides });
  }

  handleClearCanvas = () => {
    this.setState({ drawings: [] });
  }

  render() {
    const drawings = [...this.state.drawings, ...this.state.newDrawing];
    // This is hopefully solving for high resolution monitors.
    const canvasWidth = document.body.clientWidth;
    const canvasHeight = document.body.clientHeight;
    return (
      <div>
        <Stage
          className="drawing-canvas"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          width={canvasWidth}
          height={canvasHeight}
          minHeight={"600px"}
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
        <div className="drawing-tools">
          <DrawingToolbar
            handleDrawingSelection={this.handleDrawingSelection}
            handleToolbarSelection={this.handleToolbarSelection}
            handlePolygonSides={this.handlePolygonSides}
            handleClearCanvas={this.handleClearCanvas}
            polygonSides={this.state.polygonSides}
            drawingType={this.state.newDrawingType}
            currentTool={this.state.selectedTool}
          />
          <div className="flex-container justify-center">
            <div className="sub-container">
              <div className="drawing-tool-options">
                <h2>Stroke Width</h2>
                <Slider
                  className='stroke-width-slider'
                  ariaLabelForHandle='Choose stroke width'
                  value={this.state.strokeWidth}
                  min={1}
                  max={30}
                  step={1}
                  marks={{1:1, 10:10, 20:20, 30:30}}
                  onChange={(value) => {
                    this.handleStrokeWidth(value);
                  }}
                  included={false}
                />
              </div>
              <div className="drawing-tool-options">
                <h2>Number of Sides</h2>
                <Slider
                  className='polygon-sides-slider'
                  ariaLabelForHandle='Choose number of sides for polygon shapes'
                  value={this.state.polygonSides}
                  min={3}
                  max={21}
                  step={1}
                  marks={{3:3, 9:9, 15:15, 21:21}}
                  onChange={(value) => {
                    this.handlePolygonSides(value);
                  }}
                  included={false}
                />
              </div>
            </div>
            <div className="sub-container">
              <h2>Stroke Color</h2>
              <ColorPicker colorTarget={"stroke"} updateColorSelection={this.updateColorSelection} startColor={this.state.stroke} startAlpha={100}/>
            </div>
            <div className="sub-container">
              <h2>Fill Color</h2>
              <ColorPicker colorTarget={"fill"} updateColorSelection={this.updateColorSelection}  startColor={this.state.fill} startAlpha={27}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}