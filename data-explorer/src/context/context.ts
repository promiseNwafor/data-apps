import { createContext } from 'react';
import type { DataRow } from '../utils/csvParser';
import type { FilterOption, SortOption, AggregationResult } from '../utils/dataTransforms';

interface DataExplorerState {
  // Data state
  csvData?: string;
  fileName: string;
  parsedData: DataRow[];
  transformedData: DataRow[];
  aggregationData: AggregationResult[];
  
  // Loading state
  isPending: boolean;
  
  // Filter state
  filter: FilterOption;
  
  // Sort state
  sort: SortOption;
  
  // Aggregation state
  showAggregation: boolean;
  aggregateBy: string;
  aggregateColumn: string;
  
  // Chart state
  showChart: boolean;
}

interface DataExplorerActions {
  // File actions
  handleFileUpload: (content: string, name: string) => void;
  
  // Filter actions
  setFilter: (filter: FilterOption) => void;
  setFilterDebounced: (filter: FilterOption) => void;
  
  // Sort actions
  setSort: (sort: SortOption) => void;
  
  // Aggregation actions
  setShowAggregation: (show: boolean) => void;
  setAggregateBy: (column: string) => void;
  setAggregateColumn: (column: string) => void;
  
  // Chart actions
  setShowChart: (show: boolean) => void;
  
  // Reset actions
  resetFilters: () => void;
  clearData: () => void;
}

export type DataExplorerContextType = DataExplorerState & DataExplorerActions;

export const DataExplorerContext = createContext<DataExplorerContextType | undefined>(undefined);