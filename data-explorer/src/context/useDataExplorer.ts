import { useContext } from 'react';
import { DataExplorerContext, type DataExplorerContextType } from './context';

export const useDataExplorer = (): DataExplorerContextType => {
  const context = useContext(DataExplorerContext);
  if (context === undefined) {
    throw new Error('useDataExplorer must be used within a DataExplorerProvider');
  }
  return context;
};