import type { Rectangle } from "./Rectangle";

export const generateRandomColor = (): string => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 30) + 60; // 60-90%
  const lightness = Math.floor(Math.random() * 20) + 50;  // 50-70%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const createRectangle = (x: number = 20, y: number = 20): Rectangle => {
  return {
    id: `rect-${Date.now()}`,
    x,
    y,
    width: 100,
    height: 100,
    color: generateRandomColor()
  };
};

export const constrainToBounds = (
  x: number, 
  y: number, 
  width: number, 
  height: number, 
  canvasWidth: number = 800, 
  canvasHeight: number = 600
): { x: number; y: number } => {
  const constrainedX = Math.max(0, Math.min(x, canvasWidth - width));
  const constrainedY = Math.max(0, Math.min(y, canvasHeight - height));
  return { x: constrainedX, y: constrainedY };
};