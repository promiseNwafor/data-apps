import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import type { ElementProperties } from '@/types';

const DynamicElementInspector: React.FC = () => {
  const form = useFormContext<ElementProperties>();

  // Check if browser supports color input
  const supportsColorInput = useMemo(() => {
    const input = document.createElement('input');
    input.type = 'color';
    return input.type === 'color';
  }, []);

  if (!form) {
    return (
      <div className="w-72 h-full border-r border-gray-200 overflow-y-auto min-h-screen">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-1">Element Inspector</h2>
          <p className="text-base text-red-500">Form context not available</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-72 h-full border-r border-gray-200 overflow-y-auto min-h-screen"
      role="region"
      aria-label="Element property inspector"
    >
      <div className="p-6">
        <h2 id="inspector-title" className="text-2xl font-bold mb-1">Element Inspector</h2>
        <p className="text-base text-gray-500 mb-6" aria-describedby="inspector-title">
          Modify properties to see real-time updates
        </p>
        
        <div 
          className="space-y-6"
          role="form"
          aria-labelledby="inspector-title"
        >
          <FormField
            control={form.control}
            name="x"
            render={({ field }) => (
              <FormItem>
                <FormLabel>X</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    max="5000"
                    {...field} 
                    onChange={(e) => field.onChange(Number(e.target.value))} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="y"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Y</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    max="5000"
                    {...field} 
                    onChange={(e) => field.onChange(Number(e.target.value))} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1"
                    max="2000"
                    {...field} 
                    onChange={(e) => field.onChange(Number(e.target.value))} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1"
                    max="2000"
                    {...field} 
                    onChange={(e) => field.onChange(Number(e.target.value))} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="color"
            render={({ field, fieldState }) => {
              const handleColorChange = (value: string) => {
                // Allow partial typing (starts with # and contains only valid hex characters)
                const isPartialValid = /^#[0-9A-Fa-f]*$/.test(value) && value.length <= 7;
                if (isPartialValid) {
                  field.onChange(value);
                }
              };

              return (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    {supportsColorInput ? (
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="w-12 h-12 border rounded shadow-sm"
                          style={{ padding: 0 }}
                          aria-label="Color picker"
                          aria-describedby="color-text-input"
                        />
                        <Input
                          id="color-text-input"
                          type="text"
                          value={field.value}
                          onChange={(e) => handleColorChange(e.target.value)}
                          className={`w-32 ${fieldState.error ? 'border-red-500' : ''}`}
                          placeholder="#000000"
                          aria-label="Color hex code"
                        />
                      </div>
                    ) : (
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className={`w-full ${fieldState.error ? 'border-red-500' : ''}`}
                        placeholder="#000000"
                        aria-label="Color hex code"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                  {!supportsColorInput && (
                    <p className="text-xs text-gray-500 mt-1">
                      Enter a hex color code (e.g., #FF0000)
                    </p>
                  )}
                </FormItem>
              );
            }}
          />
          
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isVisible"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is Visible</FormLabel>
                <FormControl>
                  <input
                    id="visibility-checkbox"
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="accent-blue-600 w-5 h-5 rounded border-gray-300"
                    aria-describedby="visibility-description"
                  />
                </FormControl>
                <div className="flex items-center gap-2 mt-1">
                  <label htmlFor="visibility-checkbox" className="text-base cursor-pointer">
                    Is Visible
                  </label>
                </div>
                <p id="visibility-description" className="sr-only">
                  Toggle element visibility on the canvas
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default DynamicElementInspector;