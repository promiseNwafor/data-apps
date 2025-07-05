import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { ElementProperties } from '@/types';

const CanvasGrid: React.FC = () => {
  const form = useFormContext<ElementProperties>();
  const values = form?.watch();
  
  // Memoize the element styles to prevent unnecessary re-calculations
  const elementStyles = useMemo(() => {
    if (!values) return {};
    
    return {
      transform: `translate(${values.x}px, ${values.y}px)`,
      width: values.width,
      height: values.height,
      backgroundColor: values.color,
      opacity: values.isVisible ? 1 : 0,
    };
  }, [values]);
  
  if (!form) {
    return (
      <div className="w-full h-screen relative bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">Form context not available</p>
      </div>
    );
  }

  if (!values) {
    return (
      <div className="w-full h-screen relative bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">No form values available</p>
      </div>
    );
  }

  return (
    <div
      className="w-full h-screen relative"
      role="region"
      aria-label="Canvas area"
      aria-describedby="canvas-description"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      }}
    >
      <div id="canvas-description" className="sr-only">
        Visual canvas showing design element that updates in real-time based on property changes
      </div>
      <div 
        className="absolute top-0 left-0" 
        style={elementStyles}
        role="img"
        aria-label={`Design element: ${values.text}, positioned at ${values.x}, ${values.y}, size ${values.width} by ${values.height}, color ${values.color}, ${values.isVisible ? 'visible' : 'hidden'}`}
      >
        <p aria-hidden="true">{values.text}</p>
      </div>
    </div>
  );
};

export default CanvasGrid; 