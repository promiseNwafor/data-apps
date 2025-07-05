import React from 'react';

interface CanvasGridProps {
  x: number
    y: number
  width: number
    height: number
    color: string
    text: string
    isVisible: boolean
}

const CanvasGrid: React.FC<CanvasGridProps> = ({ x, y, width, height, color, text, isVisible }) => (
  <div
    className="w-full h-screen relative"
    style={{
      backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px',
    }}
  >
        <div className="absolute top-0 left-0" style={{
            transform: `translate(${x}px, ${y}px)`,
            width: width,
            height: height,
            backgroundColor: color,
            opacity: isVisible ? 1 : 0,
        }}>
            <p>{text}</p>
        </div>
  </div>
);

export default CanvasGrid; 