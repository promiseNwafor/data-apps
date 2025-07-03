import React, { useState, useMemo } from 'react';
import type { DynamicDataTableProps } from '../types';
import type { Item } from '../types';

const DynamicDataTable: React.FC<DynamicDataTableProps> = ({ data }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'value', label: 'Value' },
    { key: 'status', label: 'Status' }
  ];

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map(col => col.key)
  );
  const [nameFilter, setNameFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Item | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  const visibleColumnConfigs = useMemo(() => 
    columns.filter(col => visibleColumns.includes(col.key)),
    [visibleColumns]
  );

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesName = nameFilter === '' || 
        item.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesCategory = categoryFilter === '' || 
        item.category.toLowerCase().includes(categoryFilter.toLowerCase());
      return matchesName && matchesCategory;
    });
  }, [data, nameFilter, categoryFilter]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const handleColumnToggle = (columnKey: string) => {
    setVisibleColumns(prev => 
      prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  const handleSort = (columnKey: keyof Item) => {
    setSortConfig(prev => ({
      key: columnKey,
      direction: prev.key === columnKey && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const formatCellValue = (item: Item, key: keyof Item) => {
    if (key === 'value') {
      return `$${item[key].toFixed(2)}`;
    }
    if (key === 'status') {
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          item[key] === 'Active' ? 'bg-green-100 text-green-800' :
          item[key] === 'Inactive' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {item[key]}
        </span>
      );
    }
    return item[key];
  };

  return (
    <div className="w-full">
      {/* Column Visibility Controls */}
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

      {/* Filtering Controls */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {visibleColumnConfigs.map(column => (
                <th 
                  key={column.key}
                  onClick={() => handleSort(column.key as keyof Item)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                >
                  {column.label} {getSortIcon(column.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {visibleColumnConfigs.map(column => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCellValue(item, column.key as keyof Item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicDataTable;