import React, { createContext, useContext, useState, useTransition, useMemo, useCallback, type ReactNode } from 'react';
import { parseCSV, type DataRow } from '../utils/csvParser';
import { filterData, sortData, aggregateData, type FilterOption, type SortOption, type AggregationResult } from '../utils/dataTransforms';
import { debounce, PerformanceMonitor } from '../utils/performance';

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

type DataExplorerContextType = DataExplorerState & DataExplorerActions;

const DataExplorerContext = createContext<DataExplorerContextType | undefined>(undefined);

interface DataExplorerProviderProps {
  children: ReactNode;
  initialCsvData?: string;
}

export const DataExplorerProvider: React.FC<DataExplorerProviderProps> = ({ 
  children, 
  initialCsvData 
}) => {
  const [isPending, startTransition] = useTransition();
  const [csvData, setCsvData] = useState<string | undefined>(initialCsvData);
  const [fileName, setFileName] = useState<string>('');
  
  const [filter, setFilter] = useState<FilterOption>({
    column: '',
    value: '',
    operator: 'equals'
  });
  
  const [sort, setSort] = useState<SortOption>({
    column: '',
    direction: 'asc'
  });
  
  const [showAggregation, setShowAggregation] = useState(false);
  const [aggregateBy, setAggregateBy] = useState('');
  const [aggregateColumn, setAggregateColumn] = useState('');
  const [showChart, setShowChart] = useState(true);

  // Computed values with performance monitoring
  const parsedData = useMemo(() => {
    if (!csvData) return [];
    
    PerformanceMonitor.mark('csv-parse-start');
    const result = parseCSV(csvData);
    PerformanceMonitor.measure('CSV Parse', 'csv-parse-start');
    
    return result;
  }, [csvData]);

  const transformedData = useMemo(() => {
    if (parsedData.length === 0) return [];
    
    PerformanceMonitor.mark('transform-start');
    let result = parsedData;
    
    // Apply filter if specified
    if (filter.column && filter.value) {
      result = filterData(result, filter);
    }
    
    // Apply sort if specified
    if (sort.column) {
      result = sortData(result, sort);
    }
    
    PerformanceMonitor.measure('Data Transform', 'transform-start');
    return result;
  }, [parsedData, filter, sort]);

  const aggregationData = useMemo(() => {
    if (!showAggregation || !aggregateBy || transformedData.length === 0) return [];
    
    PerformanceMonitor.mark('aggregate-start');
    const result = aggregateData(transformedData, aggregateBy, aggregateColumn);
    PerformanceMonitor.measure('Data Aggregation', 'aggregate-start');
    
    return result;
  }, [transformedData, showAggregation, aggregateBy, aggregateColumn]);

  // Actions
  const handleFileUpload = (content: string, name: string) => {
    startTransition(() => {
      setCsvData(content);
      setFileName(name);
      // Reset filters when new data is loaded
      setFilter({ column: '', value: '', operator: 'equals' });
      setSort({ column: '', direction: 'asc' });
      setShowAggregation(false);
      setAggregateBy('');
      setAggregateColumn('');
      setShowChart(true);
    });
  };

  const resetFilters = () => {
    setFilter({ column: '', value: '', operator: 'equals' });
    setSort({ column: '', direction: 'asc' });
  };

  const clearData = () => {
    setCsvData(undefined);
    setFileName('');
    resetFilters();
    setShowAggregation(false);
    setAggregateBy('');
    setAggregateColumn('');
    setShowChart(true);
  };

  // Debounced filter for better performance during typing
  const setFilterDebounced = useCallback(
    debounce((filter: FilterOption) => {
      setFilter(filter);
    }, 300),
    []
  );

  const contextValue: DataExplorerContextType = {
    // State
    csvData,
    fileName,
    parsedData,
    transformedData,
    aggregationData,
    isPending,
    filter,
    sort,
    showAggregation,
    aggregateBy,
    aggregateColumn,
    showChart,
    
    // Actions
    handleFileUpload,
    setFilter,
    setFilterDebounced,
    setSort,
    setShowAggregation,
    setAggregateBy,
    setAggregateColumn,
    setShowChart,
    resetFilters,
    clearData,
  };

  return (
    <DataExplorerContext.Provider value={contextValue}>
      {children}
    </DataExplorerContext.Provider>
  );
};

export const useDataExplorer = (): DataExplorerContextType => {
  const context = useContext(DataExplorerContext);
  if (context === undefined) {
    throw new Error('useDataExplorer must be used within a DataExplorerProvider');
  }
  return context;
};