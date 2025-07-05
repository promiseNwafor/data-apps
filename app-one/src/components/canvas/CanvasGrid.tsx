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
      className="w-full h-full relative overflow-hidden"
      role="region"
      aria-label="Canvas area"
      aria-describedby="canvas-description"
      style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
        backgroundColor: '#fafbff',
      }}
    >
      <div id="canvas-description" className="sr-only">
        Visual canvas showing design element that updates in real-time based on property changes
      </div>
      <div 
        className="absolute transition-all duration-200 ease-out shadow-lg rounded-lg border border-white/50 flex items-center justify-center text-white font-medium text-sm backdrop-blur-sm" 
        style={{
          ...elementStyles,
          minWidth: '1px',
          minHeight: '1px',
        }}
        role="img"
        aria-label={`Design element: ${values.text}, positioned at ${values.x}, ${values.y}, size ${values.width} by ${values.height}, color ${values.color}, ${values.isVisible ? 'visible' : 'hidden'}`}
      >
        <span aria-hidden="true" className="drop-shadow-sm">{values.text}</span>
      </div>
    </div>
  );
};

export default CanvasGrid; 