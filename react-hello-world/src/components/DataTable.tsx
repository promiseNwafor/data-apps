import React from 'react';
import { useDataTableContext } from '../hooks/useDataTableContext';
import type { Item } from '../types';

export const DataTable: React.FC = () => {
  const { 
    visibleColumnConfigs, 
    sortedData, 
    handleSort, 
    getSortIcon, 
    formatCellValue 
  } = useDataTableContext();

  const renderStatusCell = (status: string) => (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
      status === 'Active' ? 'bg-green-100 text-green-800' :
      status === 'Inactive' ? 'bg-red-100 text-red-800' :
      'bg-yellow-100 text-yellow-800'
    }`}>
      {status}
    </span>
  );

  const renderCellValue = (item: Item, columnKey: string) => {
    if (columnKey === 'status') {
      return renderStatusCell(item[columnKey as keyof Item] as string);
    }
    return formatCellValue(item, columnKey as keyof Item);
  };

  return (
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
                  {renderCellValue(item, column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};