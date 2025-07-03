import { useContext } from 'react';
import { DataTableContext } from '../contexts/DataTableContextDefinition';

export function useDataTableContext() {
  const context = useContext(DataTableContext);
  if (context === undefined) {
    throw new Error('useDataTableContext must be used within a DataTableProvider');
  }
  return context;
}