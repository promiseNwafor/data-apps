import React from 'react';
import type { DynamicDataTableProps } from '../types';
import { DataTableProvider } from '../contexts/DataTableContext';
import { ColumnVisibilityControls } from './ColumnVisibilityControls';
import { FilterControls } from './FilterControls';
import { DataTable } from './DataTable';

const DynamicDataTable: React.FC<DynamicDataTableProps> = ({ data }) => {
  // Data validation
  if (!data) {
    return (
      <div className="w-full p-8 text-center text-gray-500">
        No data provided
      </div>
    );
  }

  if (!Array.isArray(data)) {
    return (
      <div className="w-full p-8 text-center text-red-500">
        Invalid data format. Expected an array.
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full p-8 text-center text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <DataTableProvider data={data}>
      <div className="w-full">
        <ColumnVisibilityControls />
        <FilterControls />
        <DataTable />
      </div>
    </DataTableProvider>
  );
};

export default DynamicDataTable;