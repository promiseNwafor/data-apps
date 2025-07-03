import { useState, useMemo, useCallback } from 'react';
import type { Item } from '../types';

interface UseDataTableProps {
  data: Item[];
}

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'value', label: 'Value' },
  { key: 'status', label: 'Status' }
] as const;

export const useDataTable = ({ data }: UseDataTableProps) => {
  const columns = COLUMNS;

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

  const handleColumnToggle = useCallback((columnKey: string) => {
    setVisibleColumns(prev => 
      prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    );
  }, []);

  const handleSort = useCallback((columnKey: keyof Item) => {
    setSortConfig(prev => ({
      key: columnKey,
      direction: prev.key === columnKey && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const getSortIcon = useCallback((columnKey: string) => {
    if (sortConfig.key !== columnKey) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  }, [sortConfig]);

  const formatCellValue = useCallback((item: Item, key: keyof Item) => {
    if (key === 'value') {
      return `$${item[key].toFixed(2)}`;
    }
    return item[key];
  }, []);

  return {
    // State
    columns,
    visibleColumns,
    visibleColumnConfigs,
    nameFilter,
    categoryFilter,
    sortConfig,
    
    // Computed data
    sortedData,
    
    // Actions
    handleColumnToggle,
    handleSort,
    getSortIcon,
    formatCellValue,
    setNameFilter,
    setCategoryFilter,
  };
};