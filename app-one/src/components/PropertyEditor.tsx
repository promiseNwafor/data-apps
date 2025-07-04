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

  const { fields, append, remove, update } = useFieldArray({
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

  const editProperty = (index: number, key: string, value: string | number) => {
    // Check for key uniqueness (excluding current property)
    const currentProperties = getValues('properties') as Property[];
    const keyExists = currentProperties.some((prop, i) => 
      i !== index && prop.key.toLowerCase() === key.toLowerCase()
    );
    
    if (keyExists) {
      setError(`properties.${index}.key`, {
        type: 'manual',
        message: `Key '${key}' already exists`
      });
      return;
    }

    // Clear any existing errors for this property
    clearErrors(`properties.${index}.key`);

    // Update the property using useFieldArray's update method
    const currentField = fields[index];
    update(index, { ...currentField, key, value });
    
    // Call onChange with updated properties
    const updatedProperties = getValues('properties') as Property[];
    onChange?.(updatedProperties);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Property Editor
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Create, edit, and visualize properties for your design elements with real-time feedback
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Properties and Form Section */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-xl sm:text-2xl font-bold">Properties</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <PropertyList 
                  properties={fields} 
                  onRemove={removeProperty}
                  onEdit={editProperty}
                />
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="text-xl sm:text-2xl font-bold">Add New Property</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <AddPropertyForm 
                  form={form}
                  control={control}
                  onSubmit={onSubmit}
                />
              </CardContent>
            </Card>
          </div>

          {/* Visualization Section */}
          <div className="xl:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm h-fit sticky top-6">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="text-xl sm:text-2xl font-bold">Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <section aria-labelledby="visualization-heading">
                  <div 
                    className="p-6 sm:p-8 border-2 border-dashed border-purple-200 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50"
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
        </div>
      </div>
    </div>
  );
};

export default PropertyEditor;