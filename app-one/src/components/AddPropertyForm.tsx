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
      <Form {...form}>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6"
          aria-label="Add new property form"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <FormField
              control={control}
              name="newKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Property Key
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., color, size, label"
                      {...field}
                      className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
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
                  <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Property Value
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="e.g., blue, 120, My Button"
                        {...field}
                        className={`h-11 pr-16 border-gray-200 focus:ring-blue-500/20 ${
                          field.value && getValueType(field.value) === 'number' 
                            ? 'border-emerald-400 focus:border-emerald-500 bg-emerald-50/50' 
                            : field.value ? 'border-purple-400 focus:border-purple-500 bg-purple-50/50' : 'focus:border-blue-500'
                        }`}
                        aria-describedby={field.value ? "value-help value-type" : "value-help"}
                        autoComplete="off"
                      />
                      {field.value && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                          <Badge 
                            variant={getValueType(field.value) === 'number' ? 'default' : 'secondary'}
                            className={`text-xs font-medium ${
                              getValueType(field.value) === 'number'
                                ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                : 'bg-purple-100 text-purple-700 border-purple-200'
                            }`}
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
                      className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-md"
                      aria-live="polite"
                    >
                      <span className="font-medium">Preview:</span> Will be stored as{' '}
                      <span className={`font-semibold ${
                        getValueType(field.value) === 'number' ? 'text-emerald-600' : 'text-purple-600'
                      }`}>
                        {getValueType(field.value)}
                      </span>
                      {getValueType(field.value) === 'number' && 
                        <span className="text-gray-500"> → {parseValue(field.value)}</span>
                      }
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            aria-describedby="submit-help"
          >
            <span className="mr-2">✨</span>
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