import React from 'react';
import { cn } from '@/lib/utils';

type PropertyVisualizationProps = {
  properties: { key: string; value: string | number; id: string }[];
};

const PropertyVisualization: React.FC<PropertyVisualizationProps> = ({ properties }) => {
  // Extract specific properties
  const colorProp = properties.find(p => p.key.toLowerCase() === 'color');
  const sizeProp = properties.find(p => p.key.toLowerCase() === 'size');
  const labelProp = properties.find(p => p.key.toLowerCase() === 'label');

  const label = labelProp ? labelProp.value.toString() : 'Preview';
  const color = colorProp?.value?.toString() || 'slate-200';
  const size = sizeProp?.value || 80;

  const visualizationDescription = `Preview element with ${
    colorProp ? `background color ${color}` : 'default gray background'
  }, ${
    sizeProp ? `size ${size} pixels` : 'default size 80 pixels'  
  }, ${
    labelProp ? `displaying text "${label}"` : 'displaying "Preview" text'
  }`;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={cn(
          'rounded-lg border-2 border-muted flex items-center justify-center transition-all duration-300 ease-in-out text-black min-w-[60px] min-h-[60px]',
          `bg-[${color}]`,
          `w-[${size}px]`,
          `h-[${size}px]`
        )}
        role="img"
        aria-label={visualizationDescription}
        tabIndex={0}
      >
        <span 
          className="text-sm font-medium text-center px-2 break-words"
          aria-hidden="true"
        >
          {label}
        </span>
      </div>
      
      {/* Property info */}
      <div className="text-center space-y-1" role="status" aria-live="polite">
        <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
          {colorProp && (
            <span aria-label={`Color property set to ${colorProp.value}`}>
              Color: <code className="bg-muted px-1 rounded">{colorProp.value}</code>
            </span>
          )}
          {sizeProp && (
            <span aria-label={`Size property set to ${sizeProp.value} pixels`}>
              Size: <code className="bg-muted px-1 rounded">{sizeProp.value}px</code>
            </span>
          )}
        </div>
        {labelProp && (
          <p className="text-xs text-muted-foreground" aria-label={`Label property set to ${labelProp.value}`}>
            Label: <code className="bg-muted px-1 rounded">{labelProp.value}</code>
          </p>
        )}
        {!colorProp && !sizeProp && !labelProp && (
          <p className="text-xs text-muted-foreground italic" role="status">
            Add 'color', 'size', or 'label' properties to see visualization
          </p>
        )}
      </div>
    </div>
  );
};

export default PropertyVisualization;