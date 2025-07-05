
import { Button } from "../ui/button";
import { useState, useCallback } from "react";
import RectangleComponent from "./Rectangle";
import type { Rectangle } from "./Rectangle";
import { createRectangle, constrainToBounds } from "./utils";

const Canvas = () => {
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [draggedRect, setDraggedRect] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const addRectangle = () => {
    const newRectangle = createRectangle();
    setRectangles(prev => [...prev, newRectangle]);
  };

  const clearCanvas = () => {
    setRectangles([]);
  };

  const handleMouseDown = useCallback((e: React.MouseEvent, rectId: string) => {
    e.preventDefault();
    const rect = rectangles.find(r => r.id === rectId);
    if (!rect) return;

    const canvasRect = e.currentTarget.parentElement!.getBoundingClientRect();
    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;

    setDraggedRect(rectId);
    setDragOffset({
      x: mouseX - rect.x,
      y: mouseY - rect.y
    });
  }, [rectangles]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedRect) return;

    const canvasRect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;

    setRectangles(prev => 
      prev.map(rect => {
        if (rect.id !== draggedRect) return rect;
        
        const newX = mouseX - dragOffset.x;
        const newY = mouseY - dragOffset.y;
        
        const { x: constrainedX, y: constrainedY } = constrainToBounds(
          newX, newY, rect.width, rect.height
        );
        
        return { ...rect, x: constrainedX, y: constrainedY };
      })
    );
  };

  const handleMouseUp = () => {
    setDraggedRect(null);
    setDragOffset({ x: 0, y: 0 });
  };
    
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Interactive Canvas</h1>
      <p className="text-gray-600 mb-6">Click "Add Rectangle" to create draggable elements. Drag them around within the canvas boundaries.</p>

      {/* Action Bar */}
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={addRectangle}>Add Rectangle</Button>
        <Button variant="destructive" onClick={clearCanvas}>Clear Canvas</Button>
        <span className="ml-2 text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">
          Elements on canvas: <span className="font-bold">{rectangles.length}</span>
        </span>
      </div>

      {/* Canvas Area */}
      <div 
        className="relative bg-white border-4 border-gray-300 shadow-lg rounded-md mx-auto" 
        style={{ width: 800, height: 600 }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute inset-0 pointer-events-none" />
        <div className="absolute top-2 left-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded shadow-sm z-10">
          Canvas: 800 × 600px
        </div>
        
        {/* Content */}
        {rectangles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center select-none relative z-10">
            <div className="text-xl font-semibold text-gray-400 mb-1">Empty Canvas</div>
            <div className="text-gray-400 text-sm">Click "Add Rectangle" to start creating elements</div>
          </div>
        ) : (
          rectangles.map(rectangle => (
            <RectangleComponent
              key={rectangle.id}
              rectangle={rectangle}
              onMouseDown={handleMouseDown}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Canvas;