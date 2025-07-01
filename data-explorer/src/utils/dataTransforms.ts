import type { DataRow } from './csvParser';

export interface FilterOption {
  column: string;
  value: string;
  operator: 'equals' | 'contains' | 'greater' | 'less';
}

export interface SortOption {
  column: string;
  direction: 'asc' | 'desc';
}

export interface AggregationResult {
  groupBy: string;
  value: string | number;
  count: number;
  sum?: number;
  average?: number;
}

export function filterData(data: DataRow[], filter: FilterOption): DataRow[] {
  if (!filter.column || !filter.value.trim()) return data;

  return data.filter(row => {
    const cellValue = row[filter.column];
    
    // Handle null/undefined values
    if (cellValue === null || cellValue === undefined) {
      return false;
    }

    const filterValue = filter.value.trim();
    
    switch (filter.operator) {
      case 'equals':
        // For exact match, compare as strings (case-insensitive) or numbers
        if (typeof cellValue === 'number') {
          const numericFilter = parseFloat(filterValue);
          return !isNaN(numericFilter) && cellValue === numericFilter;
        }
        return String(cellValue).toLowerCase() === filterValue.toLowerCase();
        
      case 'contains':
        // Always treat as string search (case-insensitive)
        return String(cellValue).toLowerCase().includes(filterValue.toLowerCase());
        
      case 'greater':
        // Only works with numeric values
        if (typeof cellValue === 'number') {
          const numericFilter = parseFloat(filterValue);
          return !isNaN(numericFilter) && cellValue > numericFilter;
        }
        // Greater than operation not supported for strings
        return false;
        
      case 'less':
        // Only works with numeric values
        if (typeof cellValue === 'number') {
          const numericFilter = parseFloat(filterValue);
          return !isNaN(numericFilter) && cellValue < numericFilter;
        }
        // Less than operation not supported for strings
        return false;
        
      default:
        return true;
    }
  });
}

export function sortData(data: DataRow[], sort: SortOption): DataRow[] {
  if (!sort.column) return data;

  return [...data].sort((a, b) => {
    const aVal = a[sort.column];
    const bVal = b[sort.column];

    let comparison = 0;
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      comparison = aVal - bVal;
    } else {
      // Case-insensitive string comparison using localeCompare
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      comparison = aStr.localeCompare(bStr);
    }

    return sort.direction === 'desc' ? -comparison : comparison;
  });
}

export function aggregateData(
  data: DataRow[], 
  groupByColumn: string, 
  aggregateColumn?: string
): AggregationResult[] {
  if (!groupByColumn) return [];

  const groups = new Map<string | number, DataRow[]>();
  
  data.forEach(row => {
    const groupValue = row[groupByColumn];
    if (!groups.has(groupValue)) {
      groups.set(groupValue, []);
    }
    groups.get(groupValue)!.push(row);
  });

  return Array.from(groups.entries()).map(([groupValue, rows]) => {
    const result: AggregationResult = {
      groupBy: groupByColumn,
      value: groupValue,
      count: rows.length,
    };

    if (aggregateColumn) {
      const numericValues = rows
        .map(row => row[aggregateColumn])
        .filter((val): val is number => typeof val === 'number');
      
      if (numericValues.length > 0) {
        result.sum = numericValues.reduce((sum, val) => sum + val, 0);
        result.average = result.sum / numericValues.length;
      }
    }

    return result;
  });
}