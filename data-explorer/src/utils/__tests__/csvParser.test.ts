import { describe, it, expect } from 'vitest';
import { parseCSV, getColumnNames, getColumnType } from '../csvParser';

describe('csvParser', () => {
  describe('parseCSV', () => {
    it('should parse basic CSV data correctly', () => {
      const csvData = `Name,Age,City
John,25,New York
Jane,30,London
Bob,35,Paris`;
      
      const result = parseCSV(csvData);
      
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        Name: 'John',
        Age: 25,
        City: 'New York'
      });
      expect(result[1]).toEqual({
        Name: 'Jane',
        Age: 30,
        City: 'London'
      });
      expect(result[2]).toEqual({
        Name: 'Bob',
        Age: 35,
        City: 'Paris'
      });
    });

    it('should handle empty CSV data', () => {
      expect(parseCSV('')).toEqual([]);
      expect(parseCSV('   ')).toEqual([]);
    });

    it('should handle CSV with only headers', () => {
      const csvData = 'Name,Age,City';
      const result = parseCSV(csvData);
      expect(result).toEqual([]);
    });

    it('should automatically convert numeric strings to numbers', () => {
      const csvData = `Product,Price,Quantity
Laptop,999.99,5
Mouse,29.50,100`;
      
      const result = parseCSV(csvData);
      
      expect(result[0]).toEqual({
        Product: 'Laptop',
        Price: 999.99,
        Quantity: 5
      });
      expect(result[1]).toEqual({
        Product: 'Mouse',
        Price: 29.50,
        Quantity: 100
      });
    });

    it('should handle mixed data types correctly', () => {
      const csvData = `Name,Active,Score,Notes
Alice,true,95.5,Good student
Bob,false,0,Absent`;
      
      const result = parseCSV(csvData);
      
      expect(result[0]).toEqual({
        Name: 'Alice',
        Active: 'true',
        Score: 95.5,
        Notes: 'Good student'
      });
      expect(result[1]).toEqual({
        Name: 'Bob',
        Active: 'false',
        Score: 0,
        Notes: 'Absent'
      });
    });

    it('should handle rows with mismatched column counts', () => {
      const csvData = `Name,Age,City
John,25,New York
Jane,30
Bob,35,Paris,Extra`;
      
      const result = parseCSV(csvData);
      
      // Should only include valid rows
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        Name: 'John',
        Age: 25,
        City: 'New York'
      });
    });

    it('should trim whitespace from values', () => {
      const csvData = `Name, Age , City
 John , 25 , New York 
 Jane , 30 , London `;
      
      const result = parseCSV(csvData);
      
      expect(result[0]).toEqual({
        Name: 'John',
        Age: 25,
        City: 'New York'
      });
      expect(result[1]).toEqual({
        Name: 'Jane',
        Age: 30,
        City: 'London'
      });
    });

    it('should handle decimal numbers correctly', () => {
      const csvData = `Product,Price
Coffee,4.99
Tea,3.50
Water,1.25`;
      
      const result = parseCSV(csvData);
      
      expect(result[0].Price).toBe(4.99);
      expect(result[1].Price).toBe(3.50);
      expect(result[2].Price).toBe(1.25);
    });

    it('should not convert non-numeric strings that start with numbers', () => {
      const csvData = `ID,Code,Phone
1,123ABC,555-1234
2,456DEF,555-5678`;
      
      const result = parseCSV(csvData);
      
      expect(result[0]).toEqual({
        ID: 1,
        Code: '123ABC',
        Phone: '555-1234'
      });
    });
  });

  describe('getColumnNames', () => {
    it('should return column names from data', () => {
      const data = [
        { Name: 'John', Age: 25, City: 'NYC' },
        { Name: 'Jane', Age: 30, City: 'LA' }
      ];
      
      const columns = getColumnNames(data);
      expect(columns).toEqual(['Name', 'Age', 'City']);
    });

    it('should return empty array for empty data', () => {
      expect(getColumnNames([])).toEqual([]);
    });

    it('should return columns from first row only', () => {
      const data = [
        { A: 1, B: 2 },
        { A: 3, B: 4 } // Second row without extra column
      ];
      
      const columns = getColumnNames(data);
      expect(columns).toEqual(['A', 'B']);
    });
  });

  describe('getColumnType', () => {
    const sampleData = [
      { Name: 'John', Age: 25, Score: 95.5, Active: 'true' },
      { Name: 'Jane', Age: 30, Score: 87.2, Active: 'false' }
    ];

    it('should detect string columns', () => {
      expect(getColumnType(sampleData, 'Name')).toBe('string');
      expect(getColumnType(sampleData, 'Active')).toBe('string');
    });

    it('should detect number columns', () => {
      expect(getColumnType(sampleData, 'Age')).toBe('number');
      expect(getColumnType(sampleData, 'Score')).toBe('number');
    });

    it('should return string for empty data', () => {
      expect(getColumnType([], 'AnyColumn')).toBe('string');
    });

    it('should return string for non-existent column', () => {
      expect(getColumnType(sampleData, 'NonExistent')).toBe('string');
    });
  });
});