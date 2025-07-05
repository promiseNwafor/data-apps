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

const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  onRemove,
  onEdit,
}) => {
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
    <section aria-labelledby='properties-heading'>
      {properties.length === 0 ? (
        <div className='text-center py-8 px-4'>
          <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center'>
            <span className='text-2xl'>📝</span>
          </div>
          <p
            className='text-gray-500 italic text-sm sm:text-base'
            role='status'
            aria-live='polite'
          >
            No properties added yet. Create your first property below!
          </p>
        </div>
      ) : (
        <div
          className='space-y-3 sm:space-y-4'
          role='list'
          aria-label={`${properties.length} properties`}
        >
          {properties.map((property, index) => (
            <div
              key={property.id}
              className='group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200'
              role='listitem'
              aria-label={`Property ${property.key} with value ${property.value}, type ${typeof property.value}`}
            >
              {editingIndex === index ? (
                // Edit mode
                <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1'>
                  <div className='flex items-center gap-2 flex-1'>
                    <Input
                      value={editKey}
                      onChange={e => setEditKey(e.target.value)}
                      onKeyDown={e => handleKeyPress(e, index)}
                      placeholder='Property key'
                      className='w-full sm:w-32 h-9 text-sm border-blue-300 focus:border-blue-500'
                      aria-label='Edit property key'
                    />
                    <span className='text-sm text-gray-400 hidden sm:inline'>
                      :
                    </span>
                    <Input
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onKeyDown={e => handleKeyPress(e, index)}
                      placeholder='Property value'
                      className='flex-1 h-9 text-sm border-blue-300 focus:border-blue-500'
                      aria-label='Edit property value'
                    />
                  </div>
                  <div className='flex gap-2 self-end sm:self-center'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => saveEdit(index)}
                      className='h-9 px-3 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200'
                      aria-label='Save changes'
                      title='Save changes (Enter)'
                    >
                      <Check className='h-4 w-4' />
                      <span className='ml-1 hidden sm:inline'>Save</span>
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={cancelEdit}
                      className='h-9 px-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
                      aria-label='Cancel editing'
                      title='Cancel editing (Escape)'
                    >
                      <XIcon className='h-4 w-4' />
                      <span className='ml-1 hidden sm:inline'>Cancel</span>
                    </Button>
                  </div>
                </div>
              ) : (
                // Display mode
                <>
                  <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 min-w-0'>
                    <div className='flex items-center gap-2 flex-wrap'>
                      <Badge
                        variant='outline'
                        className='font-mono bg-blue-50 border-blue-200 text-blue-800 px-2 py-1'
                        aria-label='Property key'
                      >
                        {property.key}
                      </Badge>
                      <span
                        className='text-sm text-gray-400'
                        aria-hidden='true'
                      >
                        :
                      </span>
                    </div>
                    <div className='flex items-center gap-2 flex-wrap min-w-0'>
                      <span
                        className='font-medium text-gray-800 break-all'
                        aria-label='Property value'
                      >
                        {property.value}
                      </span>
                      <Badge
                        variant={
                          typeof property.value === 'number'
                            ? 'default'
                            : 'secondary'
                        }
                        className={`text-xs ${
                          typeof property.value === 'number'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : 'bg-purple-100 text-purple-800 border-purple-200'
                        }`}
                        aria-label={`Value type: ${typeof property.value}`}
                      >
                        {typeof property.value}
                      </Badge>
                    </div>
                  </div>
                  <div className='flex gap-2 self-end sm:self-center'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => startEdit(index, property)}
                      className='h-9 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 opacity-70 group-hover:opacity-100 transition-opacity'
                      aria-label={`Edit property ${property.key}`}
                      title={`Edit property ${property.key}`}
                    >
                      <Edit className='h-4 w-4' />
                      <span className='ml-1 hidden sm:inline'>Edit</span>
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => onRemove(index)}
                      className='h-9 px-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 opacity-70 group-hover:opacity-100 transition-opacity'
                      aria-label={`Remove property ${property.key}`}
                      title={`Remove property ${property.key}`}
                    >
                      <X className='h-4 w-4' />
                      <span className='ml-1 hidden sm:inline'>Remove</span>
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
