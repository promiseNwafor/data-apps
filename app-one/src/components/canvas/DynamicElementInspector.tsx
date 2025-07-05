import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import type { ElementProperties } from '@/types';



interface DynamicElementInspectorProps {
  properties: ElementProperties;
  onChange: (properties: ElementProperties) => void;
}

const DynamicElementInspector: React.FC<DynamicElementInspectorProps> = ({ 
  properties, 
  onChange 
}) => {
  const handleChange = <K extends keyof ElementProperties>(key: K, value: ElementProperties[K]) => {
    onChange({ ...properties, [key]: value });
  };

  const renderPropertyInput = (key: keyof ElementProperties, value: unknown) => {
    const inputId = `property-${key}`;
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    
    if (typeof value === 'number') {
      const isNegative = value < 0;
      const shouldValidate = ['x', 'y', 'width', 'height'].includes(key);
      const hasError = shouldValidate && isNegative;
      
      const handleNumberChange = (newValue: number) => {
        const willHaveError = shouldValidate && newValue < 0;
        if (!willHaveError) {
          handleChange(key, newValue);
        }
      };
      
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={inputId}>{label}</Label>
          <Input
            id={inputId}
            type="number"
            value={value}
            onChange={(e) => handleNumberChange(Number(e.target.value))}
            className={`w-full ${hasError ? 'border-red-500' : ''}`}
          />
          {hasError && (
            <p className="text-sm text-red-500">
              {label} must be non-negative
            </p>
          )}
        </div>
      );
    }
    
    if (typeof value === 'string') {
      if (key === 'color') {
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={inputId}>{label}</Label>
            <div className="flex items-center gap-3">
              <input
                id={inputId}
                type="color"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-12 h-12 border rounded shadow-sm"
                style={{ padding: 0 }}
              />
              <Input
                type="text"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-32"
              />
            </div>
          </div>
        );
      }
      
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={inputId}>{label}</Label>
          <Input
            id={inputId}
            type="text"
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full"
          />
        </div>
      );
    }
    
    if (typeof value === 'boolean') {
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={inputId}>{label}</Label>
          <div className="flex items-center gap-2 mt-1">
            <input
              id={inputId}
              type="checkbox"
              checked={value}
              onChange={(e) => handleChange(key, e.target.checked)}
              className="accent-blue-600 w-5 h-5 rounded border-gray-300"
            />
            <span className="text-base">Visible</span>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="w-72 h-full border-r border-gray-200 overflow-y-auto min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-1">Element Inspector</h2>
        <p className="text-base text-gray-500 mb-6">Modify properties to see real-time updates</p>
        <div className="space-y-6">
          {Object.entries(properties).map(([key, value]) =>
            renderPropertyInput(key as keyof ElementProperties, value)
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicElementInspector;