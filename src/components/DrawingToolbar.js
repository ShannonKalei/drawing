import React from "react";

export default function DrawingToolbar(props) {
  const drawingType = (drawingSelection) => {
    props.handleDrawingSelection(drawingSelection);
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
    </React.Fragment>
  )
}