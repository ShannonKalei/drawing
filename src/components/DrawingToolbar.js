import React, { useState }  from "react";

export default function DrawingToolbar(props) {
  const [currentTool, setCurrentTool] = useState(props.activeTool);
  const [polygonSides, setPolygonSides] = useState(props.polygonSides);

  const toolbarSelection = (toolSelection) => {
    props.handleToolbarSelection(toolSelection);
  };

  const drawingType = (drawingSelection) => {
    props.handleDrawingSelection(drawingSelection);
  };

  const handleNumberOfPolygonSides = (sides) => {
    setPolygonSides(sides);
    props.handlePolygonSides(sides);
  }

  return (
    <React.Fragment>
      <button
        onClick={() => {
          drawingType("FreePathDrawing");
        }}
      >
        <span className="material-icons">edit</span>
        <span className="button-text">Draw</span>
      </button>
      <button
        onClick={() => {
          drawingType("ArrowDrawing");
        }}
      >
        <span className="material-icons">north_east</span>
        <span className="button-text">Arrow</span>
      </button>
      <button
        onClick={() => {
          drawingType("CircleDrawing");
        }}
      >
        <span className="material-icons">circle</span>
        <span className="button-text">Circle</span>
      </button>
      <button
        onClick={() => {
          drawingType("EllipseDrawing");
        }}
      >
        <span className="material-icons">circle</span>
        <span className="button-text">Ellipse</span>
      </button>
      <button
        onClick={() => {
          drawingType("SquareDrawing");
        }}
      >
        <span className="material-icons">square</span>
        <span className="button-text">Square</span>
      </button>
      <button
        onClick={() => {
          drawingType("PolygonDrawing");
        }}
      >
        <span className="material-icons">hexagon</span>
        <span className="button-text">Polygon</span>
      </button>
      <input 
        id="number-of-sides"
        type="number"
        inputMode="numeric"
        min={3}
        max={20}
        value={polygonSides}
        onChange={(e) => {
          handleNumberOfPolygonSides(e.target.value);
        }}
      />
      <button
        onClick={() => {
          toolbarSelection("move");
        }}
      >
        <span className="material-icons">pan_tool</span>
        <span className="button-text">Move</span>
      </button>
    </React.Fragment>
  );
}
