import React from 'react';
import type { Control, UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getValueType, parseValue } from '@/lib/utils';

type PropertyEditorForm = {
  properties: { key: string; value: string | number }[];
  newKey: string;
  newValue: string;
};

type AddPropertyFormProps = {
  form: UseFormReturn<PropertyEditorForm>;
  control: Control<PropertyEditorForm>;
  onSubmit: (data: PropertyEditorForm) => void;
};

const AddPropertyForm: React.FC<AddPropertyFormProps> = ({ form, control, onSubmit }) => {
  const { handleSubmit } = form;

  return (
    <section aria-labelledby="add-property-heading">
      <h3 id="add-property-heading" className="text-lg font-semibold mb-4">Add New Property</h3>
      <Form {...form}>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-4"
          aria-label="Add new property form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="newKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter property key"
                      {...field}
                      aria-describedby="key-help"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                  <div id="key-help" className="sr-only">
                    Enter a unique key name for the property
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="newValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter property value"
                        {...field}
                        className={
                          field.value && getValueType(field.value) === 'number' 
                            ? 'border-green-500 focus:border-green-500' 
                            : field.value ? 'border-blue-500 focus:border-blue-500' : ''
                        }
                        aria-describedby={field.value ? "value-help value-type" : "value-help"}
                        autoComplete="off"
                      />
                      {field.value && (
                        <div className="absolute right-2 top-2 flex items-center">
                          <Badge 
                            variant={getValueType(field.value) === 'number' ? 'default' : 'secondary'}
                            className="text-xs"
                            aria-label={`Will be stored as ${getValueType(field.value)}`}
                          >
                            {getValueType(field.value)}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                  <div id="value-help" className="sr-only">
                    Enter a value. Numbers will be automatically detected and converted.
                  </div>
                  {field.value && (
                    <p 
                      id="value-type" 
                      className="text-xs text-muted-foreground"
                      aria-live="polite"
                    >
                      Will be stored as: {getValueType(field.value) === 'number' ? 'number' : 'string'}
                      {getValueType(field.value) === 'number' && 
                        ` (${parseValue(field.value)})`
                      }
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            aria-describedby="submit-help"
          >
            Add Property
          </Button>
          <div id="submit-help" className="sr-only">
            Add the new property to the list
          </div>
        </form>
      </Form>
    </section>
  );
};

export default AddPropertyForm;