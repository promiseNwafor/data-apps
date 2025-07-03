import React from 'react';
import { useDataTable } from '../hooks/useDataTable';
import { DataTableContext } from './DataTableContextDefinition';
import type { Item } from '../types';

interface DataTableProviderProps {
  children: React.ReactNode;
  data: Item[];
}

export const DataTableProvider: React.FC<DataTableProviderProps> = ({ children, data }) => {
  const dataTableState = useDataTable({ data });

  return (
    <DataTableContext.Provider value={dataTableState}>
      {children}
    </DataTableContext.Provider>
  );
};