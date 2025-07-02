import React, { useState, useTransition, useMemo, type ReactNode } from 'react';
import { parseCSV } from '../utils/csvParser';
import { filterData, sortData, aggregateData, type FilterOption, type SortOption } from '../utils/dataTransforms';
import { debounce, PerformanceMonitor } from '../utils/performance';
import { DataExplorerContext, type DataExplorerContextType } from './context';

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
  const setFilterDebounced = useMemo(
    () => debounce((filter: FilterOption) => {
      setFilter(filter);
    }, 300),
    [setFilter]
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

