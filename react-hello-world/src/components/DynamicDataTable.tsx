import React from 'react';
import type { DynamicDataTableProps } from '../types';
import { DataTableProvider } from '../contexts/DataTableContext';
import { ColumnVisibilityControls } from './ColumnVisibilityControls';
import { FilterControls } from './FilterControls';
import { DataTable } from './DataTable';

const DynamicDataTable: React.FC<DynamicDataTableProps> = ({ data }) => {
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