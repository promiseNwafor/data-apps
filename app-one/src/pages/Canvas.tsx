import { useState } from 'react';
import CanvasGrid from '@/components/canvas/CanvasGrid';
import DynamicElementInspector from '../components/canvas/DynamicElementInspector';
import type { ElementProperties } from '@/types';

const initialProperties: ElementProperties = {
  x: 50,
  y: 500,
  width: 150,
  height: 100,
  color: '#3b82f6',
  text: 'Sample Element',
  isVisible: true,
};

const Canvas = () => {
  const [properties, setProperties] = useState<ElementProperties>(initialProperties);

  const handlePropertiesChange = (newProperties: ElementProperties) => {
    setProperties(newProperties);
  };

  return (
    <div className="flex w-full min-h-screen">
      <DynamicElementInspector 
        properties={properties}
        onChange={handlePropertiesChange}
      />
      <div className="w-full bg-gray-100 flex-1">
        <div className="p-4">
          <h2 className="text-lg font-bold">Canvas</h2>
          <p className="text-sm text-gray-500">Visual representation updates in real-time</p>
        </div>
        <CanvasGrid {...properties} />
      </div>
    </div>
  )
}

export default Canvas