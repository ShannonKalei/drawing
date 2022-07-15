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

  const requestClearCanvas = () => {
    props.handleClearCanvas();
  }

  // TODO: Fix this ridiculous styling.
  return (
    <React.Fragment>
      <button
      style={{
        backgroundColor: currentTool === "drawing" && currentDrawingType === "FreePathDrawing" 
        ? "var(--color-button-active)"
        : "var(--color-button)"
      }}
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
        style={{
          backgroundColor: currentTool === "drawing" && currentDrawingType === "ArrowDrawing" 
          ? "var(--color-button-active)"
          : "var(--color-button)"
        }}
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
        style={{
          backgroundColor: currentTool === "drawing" && currentDrawingType === "CircleDrawing" 
          ? "var(--color-button-active)"
          : "var(--color-button)"
        }}
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
        style={{
          backgroundColor: currentTool === "drawing" && currentDrawingType === "EllipseDrawing" 
          ? "var(--color-button-active)"
          : "var(--color-button)"
        }}
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
        style={{
          backgroundColor: currentTool === "drawing" && currentDrawingType === "SquareDrawing" 
          ? "var(--color-button-active)"
          : "var(--color-button)"
        }}
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
        style={{
          backgroundColor: currentTool === "drawing" && currentDrawingType === "PolygonDrawing" 
          ? "var(--color-button-active)"
          : "var(--color-button)"
        }}
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
      <button
        style={{
          backgroundColor: currentTool === "move" 
            ? "var(--color-button-active)"
            : "var(--color-button)",
        }}
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
      <button
        onClick={() => {
          requestClearCanvas();
        }}
      >
        <span className="material-icons">delete</span>
        <span className="button-text">Clear</span>
      </button>
    </React.Fragment>
  );
}
