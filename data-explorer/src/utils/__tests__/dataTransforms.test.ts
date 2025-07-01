import { describe, it, expect } from 'vitest';
import { filterData, sortData, aggregateData } from '../dataTransforms';
import type { FilterOption, SortOption } from '../dataTransforms';

describe('dataTransforms', () => {
  const sampleData = [
    { Name: 'John', Age: 25, Department: 'Engineering', Salary: 75000 },
    { Name: 'Jane', Age: 30, Department: 'Marketing', Salary: 65000 },
    { Name: 'Bob', Age: 35, Department: 'Engineering', Salary: 85000 },
    { Name: 'Alice', Age: 28, Department: 'Sales', Salary: 60000 },
    { Name: 'Charlie', Age: 32, Department: 'Marketing', Salary: 70000 }
  ];

  describe('filterData', () => {
    it('should filter data with equals operator', () => {
      const filter: FilterOption = {
        column: 'Department',
        value: 'Engineering',
        operator: 'equals'
      };
      
      const result = filterData(sampleData, filter);
      
      expect(result).toHaveLength(2);
      expect(result[0].Name).toBe('John');
      expect(result[1].Name).toBe('Bob');
    });

    it('should filter data with contains operator', () => {
      const filter: FilterOption = {
        column: 'Name',
        value: 'a',
        operator: 'contains'
      };
      
      const result = filterData(sampleData, filter);
      
      expect(result).toHaveLength(3); // Jane, Alice, Charlie
      expect(result.map(r => r.Name)).toEqual(['Jane', 'Alice', 'Charlie']);
    });

    it('should filter data with greater than operator for numbers', () => {
      const filter: FilterOption = {
        column: 'Salary',
        value: '70000',
        operator: 'greater'
      };
      
      const result = filterData(sampleData, filter);
      
      expect(result).toHaveLength(2); // John (75000), Bob (85000)
      expect(result[0].Name).toBe('John');
      expect(result[1].Name).toBe('Bob');
    });

    it('should filter data with less than operator for numbers', () => {
      const filter: FilterOption = {
        column: 'Age',
        value: '30',
        operator: 'less'
      };
      
      const result = filterData(sampleData, filter);
      
      expect(result).toHaveLength(2); // John (25), Alice (28)
      expect(result[0].Name).toBe('John');
      expect(result[1].Name).toBe('Alice');
    });

    it('should be case-insensitive for string operations', () => {
      const filter: FilterOption = {
        column: 'Department',
        value: 'ENGINEERING',
        operator: 'equals'
      };
      
      const result = filterData(sampleData, filter);
      
      expect(result).toHaveLength(2);
    });

    it('should return original data for empty filter', () => {
      const filter: FilterOption = {
        column: '',
        value: '',
        operator: 'equals'
      };
      
      const result = filterData(sampleData, filter);
      
      expect(result).toEqual(sampleData);
    });

    it('should return original data for empty value', () => {
      const filter: FilterOption = {
        column: 'Name',
        value: '',
        operator: 'equals'
      };
      
      const result = filterData(sampleData, filter);
      
      expect(result).toEqual(sampleData);
    });

    it('should handle whitespace in filter values', () => {
      const filter: FilterOption = {
        column: 'Department',
        value: '  Engineering  ',
        operator: 'equals'
      };
      
      const result = filterData(sampleData, filter);
      
      expect(result).toHaveLength(2);
    });

    it('should return false for greater/less operations on strings', () => {
      const filter: FilterOption = {
        column: 'Name',
        value: 'John',
        operator: 'greater'
      };
      
      const result = filterData(sampleData, filter);
      
      expect(result).toHaveLength(0);
    });
  });

  describe('sortData', () => {
    it('should sort strings in ascending order', () => {
      const sort: SortOption = {
        column: 'Name',
        direction: 'asc'
      };
      
      const result = sortData(sampleData, sort);
      
      expect(result.map(r => r.Name)).toEqual(['Alice', 'Bob', 'Charlie', 'Jane', 'John']);
    });

    it('should sort strings in descending order', () => {
      const sort: SortOption = {
        column: 'Name',
        direction: 'desc'
      };
      
      const result = sortData(sampleData, sort);
      
      expect(result.map(r => r.Name)).toEqual(['John', 'Jane', 'Charlie', 'Bob', 'Alice']);
    });

    it('should sort numbers in ascending order', () => {
      const sort: SortOption = {
        column: 'Age',
        direction: 'asc'
      };
      
      const result = sortData(sampleData, sort);
      
      expect(result.map(r => r.Age)).toEqual([25, 28, 30, 32, 35]);
    });

    it('should sort numbers in descending order', () => {
      const sort: SortOption = {
        column: 'Salary',
        direction: 'desc'
      };
      
      const result = sortData(sampleData, sort);
      
      expect(result.map(r => r.Salary)).toEqual([85000, 75000, 70000, 65000, 60000]);
    });

    it('should be case-insensitive for string sorting', () => {
      const data = [
        { Name: 'alice' },
        { Name: 'Bob' },
        { Name: 'CHARLIE' }
      ];
      
      const sort: SortOption = {
        column: 'Name',
        direction: 'asc'
      };
      
      const result = sortData(data, sort);
      
      expect(result.map(r => r.Name)).toEqual(['alice', 'Bob', 'CHARLIE']);
    });

    it('should return original data for empty column', () => {
      const sort: SortOption = {
        column: '',
        direction: 'asc'
      };
      
      const result = sortData(sampleData, sort);
      
      expect(result).toEqual(sampleData);
    });

    it('should not mutate original data', () => {
      const original = [...sampleData];
      const sort: SortOption = {
        column: 'Age',
        direction: 'asc'
      };
      
      sortData(sampleData, sort);
      
      expect(sampleData).toEqual(original);
    });
  });

  describe('aggregateData', () => {
    it('should group data by string column', () => {
      const result = aggregateData(sampleData, 'Department');
      
      expect(result).toHaveLength(3);
      
      const engineering = result.find(r => r.value === 'Engineering');
      expect(engineering?.count).toBe(2);
      
      const marketing = result.find(r => r.value === 'Marketing');
      expect(marketing?.count).toBe(2);
      
      const sales = result.find(r => r.value === 'Sales');
      expect(sales?.count).toBe(1);
    });

    it('should calculate sum and average for numeric columns', () => {
      const result = aggregateData(sampleData, 'Department', 'Salary');
      
      const engineering = result.find(r => r.value === 'Engineering');
      expect(engineering?.sum).toBe(160000); // 75000 + 85000
      expect(engineering?.average).toBe(80000); // 160000 / 2
      
      const marketing = result.find(r => r.value === 'Marketing');
      expect(marketing?.sum).toBe(135000); // 65000 + 70000
      expect(marketing?.average).toBe(67500); // 135000 / 2
    });

    it('should handle empty groupBy column', () => {
      const result = aggregateData(sampleData, '');
      
      expect(result).toEqual([]);
    });

    it('should handle non-existent aggregate column', () => {
      const result = aggregateData(sampleData, 'Department', 'NonExistent');
      
      expect(result).toHaveLength(3);
      expect(result[0].sum).toBeUndefined();
      expect(result[0].average).toBeUndefined();
    });

    it('should handle mixed numeric and non-numeric values in aggregate column', () => {
      const mixedData = [
        { Department: 'A', Value: 100 },
        { Department: 'A', Value: 'invalid' },
        { Department: 'A', Value: 200 }
      ];
      
      const result = aggregateData(mixedData, 'Department', 'Value');
      
      expect(result[0].sum).toBe(300); // Only numeric values: 100 + 200
      expect(result[0].average).toBe(150); // 300 / 2
      expect(result[0].count).toBe(3); // All rows counted
    });

    it('should include correct metadata in results', () => {
      const result = aggregateData(sampleData, 'Department', 'Salary');
      
      expect(result[0].groupBy).toBe('Department');
      expect(typeof result[0].value).toBe('string');
      expect(typeof result[0].count).toBe('number');
    });
  });
});