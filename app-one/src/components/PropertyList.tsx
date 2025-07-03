import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

type Property = {
  key: string;
  value: string | number;
  id: string;
};

type PropertyListProps = {
  properties: Property[];
  onRemove: (index: number) => void;
};

const PropertyList: React.FC<PropertyListProps> = ({ properties, onRemove }) => {
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
              <div className="flex items-center gap-3">
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
          ))}
        </div>
      )}
    </section>
  );
};

export default PropertyList;