import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PropertyVisualization from './PropertyVisualization';
import PropertyList from './PropertyList';
import AddPropertyForm from './AddPropertyForm';
import { parseValue } from '@/lib/utils';

type Property = {
  key: string;
  value: string | number;
};

type PropertyEditorProps = {
  initialProperties: Property[];
  onChange?: (properties: Property[]) => void;
};

const propertyEditorSchema = z.object({
  properties: z.array(z.object({
    key: z.string(),
    value: z.union([z.string(), z.number()]),
  })),
  newKey: z.string().min(1, 'Key is required').trim(),
  newValue: z.string().min(1, 'Value is required').trim(),
});

type PropertyEditorForm = z.infer<typeof propertyEditorSchema>;


const PropertyEditor: React.FC<PropertyEditorProps> = ({ 
  initialProperties = [], 
  onChange 
}) => {
  const form = useForm<PropertyEditorForm>({
    resolver: zodResolver(propertyEditorSchema),
    defaultValues: {
      properties: initialProperties,
      newKey: '',
      newValue: '',
    },
  });

  const { 
    control, 
    setValue, 
    getValues, 
    setError, 
    clearErrors
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'properties',
  });


  // Helper function to check if key is unique
  const isKeyUnique = (key: string): boolean => {
    return !getValues('properties').some(p => p.key.toLowerCase() === key.toLowerCase());
  };

  const onSubmit = (data: PropertyEditorForm) => {
    // Clear any previous errors
    clearErrors();

    // Check key uniqueness
    if (!isKeyUnique(data.newKey)) {
      setError('newKey', { 
        type: 'manual', 
        message: `Key '${data.newKey}' already exists` 
      });
      return;
    }

    // Parse the value
    const parsedValue = parseValue(data.newValue);
    
    // Add the new property
    append({ key: data.newKey, value: parsedValue });
    
    // Clear form
    setValue('newKey', '');
    setValue('newValue', '');
    
    // Call onChange with updated properties
    const updatedProperties = [...getValues('properties'), { key: data.newKey, value: parsedValue }];
    onChange?.(updatedProperties);
  };

  const removeProperty = (index: number) => {
    remove(index);
    const updatedProperties = getValues('properties') as Property[];
    onChange?.(updatedProperties.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Property Editor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <PropertyList 
            properties={fields} 
            onRemove={removeProperty} 
          />

          <AddPropertyForm 
            form={form}
            control={control}
            onSubmit={onSubmit}
          />

          {/* Simple Visualization */}
          <section aria-labelledby="visualization-heading">
            <h3 id="visualization-heading" className="text-lg font-semibold mb-4">Visualization</h3>
            <div 
              className="p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg bg-muted/20"
              role="img"
              aria-label="Property visualization preview"
              aria-describedby="visualization-description"
            >
              <PropertyVisualization properties={fields} />
            </div>
            <div id="visualization-description" className="sr-only">
              Visual representation of your properties. Color property affects background color, size property affects dimensions, and label property affects the displayed text.
            </div>
          </section>

        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyEditor;