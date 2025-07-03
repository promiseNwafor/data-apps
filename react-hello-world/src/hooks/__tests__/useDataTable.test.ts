import { renderHook, act } from '@testing-library/react';
import { useDataTable } from '../useDataTable';
import type { Item } from '../../types';

const mockData: Item[] = [
  { id: '1', name: 'Widget A', category: 'Electronics', value: 299.99, status: 'Active' },
  { id: '2', name: 'Gadget B', category: 'Home', value: 149.50, status: 'Inactive' },
  { id: '3', name: 'Tool C', category: 'Electronics', value: 79.99, status: 'Pending' },
  { id: '4', name: 'Device D', category: 'Sports', value: 199.00, status: 'Active' },
];

describe('useDataTable', () => {
  describe('Initial State', () => {
    it('should initialize with all columns visible', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      expect(result.current.visibleColumns).toEqual(['id', 'name', 'category', 'value', 'status']);
      expect(result.current.visibleColumnConfigs).toHaveLength(5);
    });

    it('should initialize with empty filters', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      expect(result.current.nameFilter).toBe('');
      expect(result.current.categoryFilter).toBe('');
    });

    it('should initialize with no sorting', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      expect(result.current.sortConfig.key).toBeNull();
      expect(result.current.sortConfig.direction).toBe('asc');
    });

    it('should return all data when no filters or sorting applied', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      expect(result.current.sortedData).toEqual(mockData);
    });
  });

  describe('Column Visibility', () => {
    it('should toggle column visibility off', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.handleColumnToggle('name');
      });

      expect(result.current.visibleColumns).toEqual(['id', 'category', 'value', 'status']);
      expect(result.current.visibleColumnConfigs).toHaveLength(4);
    });

    it('should toggle column visibility back on', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      // First toggle off
      act(() => {
        result.current.handleColumnToggle('name');
      });
      
      // Then toggle back on
      act(() => {
        result.current.handleColumnToggle('name');
      });

      expect(result.current.visibleColumns).toEqual(['id', 'category', 'value', 'status', 'name']);
    });

    it('should handle multiple column toggles', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.handleColumnToggle('id');
        result.current.handleColumnToggle('value');
      });

      expect(result.current.visibleColumns).toEqual(['name', 'category', 'status']);
      expect(result.current.visibleColumnConfigs).toHaveLength(3);
    });
  });

  describe('Filtering Logic', () => {
    it('should filter by name (case-insensitive)', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.setNameFilter('widget');
      });

      expect(result.current.nameFilter).toBe('widget');
      expect(result.current.sortedData).toHaveLength(1);
      expect(result.current.sortedData[0].name).toBe('Widget A');
    });

    it('should filter by name (partial match)', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.setNameFilter('d');
      });

      expect(result.current.sortedData).toHaveLength(3);
      expect(result.current.sortedData.map(item => item.name)).toEqual(['Widget A', 'Gadget B', 'Device D']);
    });

    it('should filter by category (case-insensitive)', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.setCategoryFilter('ELECTRONICS');
      });

      expect(result.current.categoryFilter).toBe('ELECTRONICS');
      expect(result.current.sortedData).toHaveLength(2);
      expect(result.current.sortedData.map(item => item.name)).toEqual(['Widget A', 'Tool C']);
    });

    it('should filter by category (partial match)', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.setCategoryFilter('port');
      });

      expect(result.current.sortedData).toHaveLength(1);
      expect(result.current.sortedData[0].category).toBe('Sports');
    });

    it('should combine name and category filters (AND logic)', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.setNameFilter('Widget');
        result.current.setCategoryFilter('Electronics');
      });

      expect(result.current.sortedData).toHaveLength(1);
      expect(result.current.sortedData[0].name).toBe('Widget A');
      expect(result.current.sortedData[0].category).toBe('Electronics');
    });

    it('should return empty array when filters match nothing', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.setNameFilter('NonExistent');
      });

      expect(result.current.sortedData).toHaveLength(0);
    });

    it('should return all data when filters are cleared', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      // Set filters
      act(() => {
        result.current.setNameFilter('Widget');
        result.current.setCategoryFilter('Electronics');
      });

      // Clear filters
      act(() => {
        result.current.setNameFilter('');
        result.current.setCategoryFilter('');
      });

      expect(result.current.sortedData).toEqual(mockData);
    });

    it('should handle empty string filters as no filter', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.setNameFilter('');
        result.current.setCategoryFilter('Sports');
      });

      expect(result.current.sortedData).toHaveLength(1);
      expect(result.current.sortedData[0].category).toBe('Sports');
    });
  });

  describe('Sorting Functionality', () => {
    it('should sort by name in ascending order', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.handleSort('name');
      });

      expect(result.current.sortConfig.key).toBe('name');
      expect(result.current.sortConfig.direction).toBe('asc');
      expect(result.current.sortedData.map(item => item.name)).toEqual([
        'Device D', 'Gadget B', 'Tool C', 'Widget A'
      ]);
    });

    it('should sort by name in descending order when clicked twice', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.handleSort('name');
      });
      
      act(() => {
        result.current.handleSort('name');
      });

      expect(result.current.sortConfig.key).toBe('name');
      expect(result.current.sortConfig.direction).toBe('desc');
      expect(result.current.sortedData.map(item => item.name)).toEqual([
        'Widget A', 'Tool C', 'Gadget B', 'Device D'
      ]);
    });

    it('should sort by value (number) in ascending order', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.handleSort('value');
      });

      expect(result.current.sortConfig.key).toBe('value');
      expect(result.current.sortConfig.direction).toBe('asc');
      expect(result.current.sortedData.map(item => item.value)).toEqual([
        79.99, 149.50, 199.00, 299.99
      ]);
    });

    it('should sort by value in descending order when clicked twice', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.handleSort('value');
      });
      
      act(() => {
        result.current.handleSort('value');
      });

      expect(result.current.sortConfig.direction).toBe('desc');
      expect(result.current.sortedData.map(item => item.value)).toEqual([
        299.99, 199.00, 149.50, 79.99
      ]);
    });

    it('should sort by status in ascending order', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.handleSort('status');
      });

      expect(result.current.sortConfig.key).toBe('status');
      expect(result.current.sortedData.map(item => item.status)).toEqual([
        'Active', 'Active', 'Inactive', 'Pending'
      ]);
    });

    it('should switch sorting column when different column is clicked', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      // First sort by name
      act(() => {
        result.current.handleSort('name');
      });
      
      // Then sort by value
      act(() => {
        result.current.handleSort('value');
      });

      expect(result.current.sortConfig.key).toBe('value');
      expect(result.current.sortConfig.direction).toBe('asc');
      expect(result.current.sortedData.map(item => item.value)).toEqual([
        79.99, 149.50, 199.00, 299.99
      ]);
    });

    it('should return correct sort icon for unsorted column', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      expect(result.current.getSortIcon('name')).toBe('↕');
    });

    it('should return correct sort icon for ascending sorted column', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.handleSort('name');
      });

      expect(result.current.getSortIcon('name')).toBe('↑');
      expect(result.current.getSortIcon('value')).toBe('↕');
    });

    it('should return correct sort icon for descending sorted column', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      act(() => {
        result.current.handleSort('name');
        result.current.handleSort('name');
      });

      expect(result.current.getSortIcon('name')).toBe('↓');
    });

    it('should sort filtered data correctly', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      // First filter
      act(() => {
        result.current.setCategoryFilter('Electronics');
      });
      
      // Then sort by value
      act(() => {
        result.current.handleSort('value');
      });

      expect(result.current.sortedData).toHaveLength(2);
      expect(result.current.sortedData.map(item => item.value)).toEqual([79.99, 299.99]);
      expect(result.current.sortedData.map(item => item.name)).toEqual(['Tool C', 'Widget A']);
    });
  });

  describe('Data Formatting', () => {
    it('should format value column as currency', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      const formattedValue = result.current.formatCellValue(mockData[0], 'value');
      expect(formattedValue).toBe('$299.99');
    });

    it('should format value with two decimal places', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      const testItem = { ...mockData[0], value: 100 };
      const formattedValue = result.current.formatCellValue(testItem, 'value');
      expect(formattedValue).toBe('$100.00');
    });

    it('should return string values as-is for non-value columns', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      const formattedName = result.current.formatCellValue(mockData[0], 'name');
      expect(formattedName).toBe('Widget A');
      
      const formattedCategory = result.current.formatCellValue(mockData[0], 'category');
      expect(formattedCategory).toBe('Electronics');
      
      const formattedId = result.current.formatCellValue(mockData[0], 'id');
      expect(formattedId).toBe('1');
    });

    it('should return status values as-is', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      const formattedStatus = result.current.formatCellValue(mockData[0], 'status');
      expect(formattedStatus).toBe('Active');
      
      const formattedInactive = result.current.formatCellValue(mockData[1], 'status');
      expect(formattedInactive).toBe('Inactive');
      
      const formattedPending = result.current.formatCellValue(mockData[2], 'status');
      expect(formattedPending).toBe('Pending');
    });

    it('should handle edge cases for value formatting', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      const testItem = { ...mockData[0], value: 0 };
      const formattedZero = result.current.formatCellValue(testItem, 'value');
      expect(formattedZero).toBe('$0.00');
      
      const testItemLarge = { ...mockData[0], value: 1234567.89 };
      const formattedLarge = result.current.formatCellValue(testItemLarge, 'value');
      expect(formattedLarge).toBe('$1234567.89');
    });
  });

  describe('Integration Tests', () => {
    it('should handle complex workflow: filter → sort → visibility', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      // Step 1: Filter by category
      act(() => {
        result.current.setCategoryFilter('Electronics');
      });
      
      // Step 2: Sort by value descending
      act(() => {
        result.current.handleSort('value');
        result.current.handleSort('value');
      });
      
      // Step 3: Hide ID column
      act(() => {
        result.current.handleColumnToggle('id');
      });

      // Verify final state
      expect(result.current.sortedData).toHaveLength(2);
      expect(result.current.sortedData.map(item => item.name)).toEqual(['Widget A', 'Tool C']);
      expect(result.current.visibleColumns).toEqual(['name', 'category', 'value', 'status']);
      expect(result.current.sortConfig.direction).toBe('desc');
    });

    it('should maintain sort when filters change', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      // First sort by name
      act(() => {
        result.current.handleSort('name');
      });
      
      // Then filter - sort should remain
      act(() => {
        result.current.setNameFilter('d');
      });

      expect(result.current.sortConfig.key).toBe('name');
      expect(result.current.sortConfig.direction).toBe('asc');
      expect(result.current.sortedData.map(item => item.name)).toEqual(['Device D', 'Gadget B', 'Widget A']);
    });

    it('should handle empty data gracefully', () => {
      const { result } = renderHook(() => useDataTable({ data: [] }));
      
      expect(result.current.sortedData).toEqual([]);
      expect(result.current.visibleColumnConfigs).toHaveLength(5);
      
      // Should not error when trying to filter empty data
      act(() => {
        result.current.setNameFilter('test');
      });
      
      expect(result.current.sortedData).toEqual([]);
    });

    it('should reset sort direction when switching columns', () => {
      const { result } = renderHook(() => useDataTable({ data: mockData }));
      
      // Sort by name descending
      act(() => {
        result.current.handleSort('name');
        result.current.handleSort('name');
      });
      
      expect(result.current.sortConfig.direction).toBe('desc');
      
      // Switch to value column - should reset to ascending
      act(() => {
        result.current.handleSort('value');
      });
      
      expect(result.current.sortConfig.key).toBe('value');
      expect(result.current.sortConfig.direction).toBe('asc');
    });
  });
});