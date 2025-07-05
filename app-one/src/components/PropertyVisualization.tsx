import React from 'react';
import { cn } from '@/lib/utils';

type PropertyVisualizationProps = {
  properties: { key: string; value: string | number; id: string }[];
};

const PropertyVisualization: React.FC<PropertyVisualizationProps> = ({
  properties,
}) => {
  // Extract specific properties
  const colorProp = properties.find(p => p.key.toLowerCase() === 'color');
  const sizeProp = properties.find(p => p.key.toLowerCase() === 'size');
  const labelProp = properties.find(p => p.key.toLowerCase() === 'label');

  const label = labelProp ? labelProp.value.toString() : 'Preview';
  const color = colorProp?.value?.toString() || 'slate-200';
  const size = sizeProp?.value || 80;

  const visualizationDescription = `Preview element with ${
    colorProp ? `background color ${color}` : 'default gray background'
  }, ${sizeProp ? `size ${size} pixels` : 'default size 80 pixels'}, ${
    labelProp ? `displaying text "${label}"` : 'displaying "Preview" text'
  }`;

  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='relative'>
        <div
          className={cn(
            'rounded-xl border-4 border-white shadow-lg flex items-center justify-center transition-all duration-500 ease-out hover:scale-105 min-w-[80px] min-h-[80px] backdrop-blur-sm',
            `bg-[${color}]`,
            `w-[${size}px]`,
            `h-[${size}px]`
          )}
          role='img'
          aria-label={visualizationDescription}
          tabIndex={0}
        >
          <span
            className='text-sm font-bold text-center px-3 py-1 bg-white/90 rounded-lg shadow-sm break-words max-w-full'
            aria-hidden='true'
            style={{
              fontSize:
                typeof size === 'number' && size < 100
                  ? '0.75rem'
                  : typeof size === 'number' && size < 150
                    ? '0.875rem'
                    : '1rem',
              color: '#374151',
            }}
          >
            {label}
          </span>
        </div>
        {/* Decorative elements */}
        <div className='absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80'></div>
        <div className='absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60'></div>
      </div>

      {/* Property info */}
      <div
        className='text-center space-y-3 w-full'
        role='status'
        aria-live='polite'
      >
        {(colorProp || sizeProp) && (
          <div className='flex flex-wrap justify-center gap-2'>
            {colorProp && (
              <div
                className='bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200 shadow-sm'
                aria-label={`Color property set to ${colorProp.value}`}
              >
                <div className='flex items-center gap-2'>
                  <div
                    className='w-4 h-4 rounded-full border-2 border-white shadow-sm'
                    style={{ backgroundColor: colorProp.value.toString() }}
                  ></div>
                  <span className='text-xs font-medium text-gray-700'>
                    <span className='text-gray-500'>Color:</span>{' '}
                    {colorProp.value}
                  </span>
                </div>
              </div>
            )}
            {sizeProp && (
              <div
                className='bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200 shadow-sm'
                aria-label={`Size property set to ${sizeProp.value} pixels`}
              >
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 border-2 border-gray-400 rounded'></div>
                  <span className='text-xs font-medium text-gray-700'>
                    <span className='text-gray-500'>Size:</span>{' '}
                    {sizeProp.value}px
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {labelProp && (
          <div
            className='bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200 shadow-sm inline-block'
            aria-label={`Label property set to ${labelProp.value}`}
          >
            <div className='flex items-center gap-2'>
              <span className='text-sm'>📝</span>
              <span className='text-xs font-medium text-gray-700'>
                <span className='text-gray-500'>Label:</span> "{labelProp.value}
                "
              </span>
            </div>
          </div>
        )}

        {!colorProp && !sizeProp && !labelProp && (
          <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-6 py-4 border border-gray-200'>
            <div className='text-center space-y-2'>
              <div className='text-2xl'>🎨</div>
              <p className='text-sm text-gray-600 font-medium' role='status'>
                Add properties to see them visualized!
              </p>
              <p className='text-xs text-gray-500'>
                Try:{' '}
                <code className='bg-white px-1 py-0.5 rounded text-blue-600'>
                  color
                </code>
                ,{' '}
                <code className='bg-white px-1 py-0.5 rounded text-green-600'>
                  size
                </code>
                , or{' '}
                <code className='bg-white px-1 py-0.5 rounded text-purple-600'>
                  label
                </code>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyVisualization;
