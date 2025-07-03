import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, Edit, Check, XIcon } from 'lucide-react';
import { parseValue } from '@/lib/utils';

type Property = {
  key: string;
  value: string | number;
  id: string;
};

type PropertyListProps = {
  properties: Property[];
  onRemove: (index: number) => void;
  onEdit: (index: number, key: string, value: string | number) => void;
};

const PropertyList: React.FC<PropertyListProps> = ({ properties, onRemove, onEdit }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editKey, setEditKey] = useState('');
  const [editValue, setEditValue] = useState('');

  const startEdit = (index: number, property: Property) => {
    setEditingIndex(index);
    setEditKey(property.key);
    setEditValue(property.value.toString());
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditKey('');
    setEditValue('');
  };

  const saveEdit = (index: number) => {
    if (editKey.trim() === '' || editValue.trim() === '') {
      return; // Don't save empty values
    }
    
    const parsedValue = parseValue(editValue);
    onEdit(index, editKey.trim(), parsedValue);
    cancelEdit();
  };

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      saveEdit(index);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <section aria-labelledby="properties-heading">
      <h3 id="properties-heading" className="text-lg font-semibold mb-4">Properties</h3>
      {properties.length === 0 ? (
        <p className="text-muted-foreground italic" role="status" aria-live="polite">
          No properties added yet.
        </p>
      ) : (
        <div 
          className="space-y-3" 
          role="list" 
          aria-label={`${properties.length} properties`}
        >
          {properties.map((property, index) => (
            <div 
              key={property.id} 
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border"
              role="listitem"
              aria-label={`Property ${property.key} with value ${property.value}, type ${typeof property.value}`}
            >
              {editingIndex === index ? (
                // Edit mode
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    value={editKey}
                    onChange={(e) => setEditKey(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, index)}
                    placeholder="Property key"
                    className="w-32 h-8 text-sm"
                    aria-label="Edit property key"
                  />
                  <span className="text-sm text-muted-foreground">:</span>
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, index)}
                    placeholder="Property value"
                    className="flex-1 h-8 text-sm"
                    aria-label="Edit property value"
                  />
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => saveEdit(index)}
                      className="h-8 w-8 p-0 hover:bg-green-100"
                      aria-label="Save changes"
                      title="Save changes (Enter)"
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={cancelEdit}
                      className="h-8 w-8 p-0 hover:bg-red-100"
                      aria-label="Cancel editing"
                      title="Cancel editing (Escape)"
                    >
                      <XIcon className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ) : (
                // Display mode
                <>
                  <div className="flex items-center gap-3 flex-1">
                    <Badge variant="outline" className="font-mono" aria-label="Property key">
                      {property.key}
                    </Badge>
                    <span className="text-sm text-muted-foreground" aria-hidden="true">:</span>
                    <span className="font-medium" aria-label="Property value">{property.value}</span>
                    <Badge 
                      variant={typeof property.value === 'number' ? 'default' : 'secondary'}
                      className="text-xs"
                      aria-label={`Value type: ${typeof property.value}`}
                    >
                      {typeof property.value}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(index, property)}
                      className="h-8 w-8 p-0 hover:bg-blue-100"
                      aria-label={`Edit property ${property.key}`}
                      title={`Edit property ${property.key}`}
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(index)}
                      className="h-8 w-8 p-0 hover:bg-destructive/20"
                      aria-label={`Remove property ${property.key}`}
                      title={`Remove property ${property.key}`}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PropertyList;