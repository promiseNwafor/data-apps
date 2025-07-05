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
      className="w-80 h-full bg-white/90 backdrop-blur-sm border-r border-gray-200/50 overflow-y-auto min-h-screen shadow-lg"
      role="region"
      aria-label="Element property inspector"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h2 id="inspector-title" className="text-xl font-bold text-gray-800">Element Inspector</h2>
        </div>
        <p className="text-sm text-gray-600" aria-describedby="inspector-title">
          Modify properties to see real-time updates
        </p>
      </div>
      <div className="p-6">
        
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
                <FormLabel className="text-xs font-medium text-gray-600 uppercase tracking-wide">X</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    max="5000"
                    {...field} 
                    onChange={(e) => field.onChange(Number(e.target.value))} 
                    className="bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg"
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
                <FormLabel className="text-xs font-medium text-gray-600 uppercase tracking-wide">Y</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    max="5000"
                    {...field} 
                    onChange={(e) => field.onChange(Number(e.target.value))} 
                    className="bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Size Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
              Size
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-gray-600 uppercase tracking-wide">Width</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        max="2000"
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))} 
                        className="bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg"
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
                    <FormLabel className="text-xs font-medium text-gray-600 uppercase tracking-wide">Height</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        max="2000"
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))} 
                        className="bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Appearance Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-1 h-4 bg-pink-500 rounded-full"></div>
              Appearance
            </h3>
            
            <FormField
              control={form.control}
              name="color"
              render={({ field, fieldState }) => {
                const handleColorChange = (value: string) => {
                  const isPartialValid = /^#[0-9A-Fa-f]*$/.test(value) && value.length <= 7;
                  if (isPartialValid) {
                    field.onChange(value);
                  }
                };

                return (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-gray-600 uppercase tracking-wide">Color</FormLabel>
                    <FormControl>
                      {supportsColorInput ? (
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-12 h-12 border-2 border-gray-200 rounded-xl shadow-sm cursor-pointer"
                            style={{ padding: 2 }}
                            aria-label="Color picker"
                            aria-describedby="color-text-input"
                          />
                          <Input
                            id="color-text-input"
                            type="text"
                            value={field.value}
                            onChange={(e) => handleColorChange(e.target.value)}
                            className={`flex-1 bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg ${fieldState.error ? 'border-red-500' : ''}`}
                            placeholder="#000000"
                            aria-label="Color hex code"
                          />
                        </div>
                      ) : (
                        <Input
                          type="text"
                          value={field.value}
                          onChange={(e) => handleColorChange(e.target.value)}
                          className={`w-full bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg ${fieldState.error ? 'border-red-500' : ''}`}
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
                  <FormLabel className="text-xs font-medium text-gray-600 uppercase tracking-wide">Text</FormLabel>
                  <FormControl>
                    <Input 
                      type="text" 
                      {...field} 
                      className="bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg"
                      placeholder="Enter text content"
                    />
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
                  <FormLabel className="text-xs font-medium text-gray-600 uppercase tracking-wide">Visibility</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3 p-3 bg-white/50 border border-gray-200 rounded-lg">
                      <input
                        id="visibility-checkbox"
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        aria-describedby="visibility-description"
                      />
                      <label htmlFor="visibility-checkbox" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Element is visible
                      </label>
                    </div>
                  </FormControl>
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
    </div>
  );
};

export default DynamicElementInspector;