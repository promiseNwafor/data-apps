import React from 'react';
import { useDataTableContext } from '../hooks/useDataTableContext';

export const ColumnVisibilityControls: React.FC = () => {
  const { columns, visibleColumns, handleColumnToggle } = useDataTableContext();

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Column Visibility</h3>
      <div className="flex flex-wrap gap-3">
        {columns.map(column => (
          <label key={column.key} className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={visibleColumns.includes(column.key)}
              onChange={() => handleColumnToggle(column.key)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
            />
            <span className="text-sm font-medium">{column.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};