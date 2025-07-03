import React from 'react';
import { useDataTableContext } from '../hooks/useDataTableContext';

export const FilterControls: React.FC = () => {
  const { nameFilter, categoryFilter, setNameFilter, setCategoryFilter } = useDataTableContext();

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Name</label>
          <input 
            type="text" 
            placeholder="Search names..." 
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};