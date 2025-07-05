import { memo } from "react";

interface Rectangle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface RectangleComponentProps {
  rectangle: Rectangle;
  onMouseDown: (e: React.MouseEvent, rectId: string) => void;
}

const RectangleComponent = memo(({ rectangle, onMouseDown }: RectangleComponentProps) => {
  return (
    <div
      className="absolute cursor-move border-2 border-gray-400 shadow-sm"
      style={{
        left: rectangle.x,
        top: rectangle.y,
        width: rectangle.width,
        height: rectangle.height,
        backgroundColor: rectangle.color,
      }}
      onMouseDown={(e) => onMouseDown(e, rectangle.id)}
    />
  );
});

RectangleComponent.displayName = "RectangleComponent";

export default RectangleComponent;
export type { Rectangle };