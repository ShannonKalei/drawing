import React, { useState }  from "react";

export default function DrawingToolbar(props) {
  const [currentTool, setCurrentTool] = useState(props.currentTool);
  const [currentDrawingType, setCurrentDrawingTypeTool] = useState(props.drawingType);
  const [polygonSides, setPolygonSides] = useState(props.polygonSides);

  const toolbarSelection = (toolSelection) => {
    setCurrentTool(toolSelection);
    props.handleToolbarSelection(toolSelection);
  };

  const drawingType = (drawingSelection) => {
    setCurrentTool("drawing");
    setCurrentDrawingTypeTool(drawingSelection);
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
        <span 
          className="button-text"
          style={{ 
            textDecoration: currentTool === "drawing" 
              && currentDrawingType === "FreePathDrawing" 
              ? "underline 2px" : "" 
          }}>
            Draw
        </span>
      </button>

      <button
        onClick={() => {
          drawingType("ArrowDrawing");
        }}
      >
        <span className="material-icons">north_east</span>
        <span 
          className="button-text"
          style={{ 
            textDecoration: currentTool === "drawing" 
              && currentDrawingType === "ArrowDrawing" 
              ? "underline 2px" : "" 
          }}>
            Arrow
        </span>
      </button>

      <button
        onClick={() => {
          drawingType("CircleDrawing");
        }}
      >
        <span className="material-icons">circle</span>
        <span 
          className="button-text"
          style={{ 
            textDecoration: currentTool === "drawing" 
              && currentDrawingType === "CircleDrawing" 
              ? "underline 2px" : "" 
          }}>
            Circle
        </span>
      </button>

      <button
        onClick={() => {
          drawingType("EllipseDrawing");
        }}
      >
        <span className="material-icons">circle</span>
        <span 
          className="button-text"
          style={{ 
            textDecorationSkipInk: "none",
            textDecoration: currentTool === "drawing" 
              && currentDrawingType === "EllipseDrawing" 
              ? "underline 2px" : "" 
          }}>
            Ellipse
        </span>
      </button>

      <button
        onClick={() => {
          drawingType("SquareDrawing");
        }}
      >
        <span className="material-icons">square</span>
        <span 
          className="button-text"
          style={{ 
            textDecorationSkipInk: "none",
            textDecoration: currentTool === "drawing" 
              && currentDrawingType === "SquareDrawing" 
              ? "underline 2px" : "" 
          }}>
            Square
        </span>
      </button>

      <button
        onClick={() => {
          drawingType("PolygonDrawing");
        }}
      >
        <span className="material-icons">hexagon</span>
        <span 
          className="button-text"
          style={{ 
            textDecorationSkipInk: "none",
            textDecoration: currentTool === "drawing" 
              && currentDrawingType === "PolygonDrawing" 
              ? "underline 2px" : "" 
          }}>
            Polygon
          </span>
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
        <span 
          className="button-text"
          style={{ 
            textDecoration: currentTool === "move" 
              ? "underline 2px" : "" 
          }}>
            Move
        </span>
      </button>
    </React.Fragment>
  );
}
