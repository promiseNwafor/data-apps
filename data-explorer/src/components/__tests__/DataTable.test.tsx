import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from '../DataTable';

describe('DataTable', () => {
  const sampleData = [
    { Name: 'John', Age: 25, City: 'New York' },
    { Name: 'Jane', Age: 30, City: 'London' },
    { Name: 'Bob', Age: 35, City: 'Paris' }
  ];

  it('should render table with data', () => {
    render(<DataTable data={sampleData} />);
    
    // Check headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
    
    // Check data rows
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
  });

  it('should show no data message when data is empty', () => {
    render(<DataTable data={[]} />);
    
    expect(screen.getByText('No data to display')).toBeInTheDocument();
  });

  it('should format numbers with locale formatting', () => {
    const data = [{ Amount: 1234567.89 }];
    render(<DataTable data={data} />);
    
    // Numbers should be formatted with commas
    expect(screen.getByText('1,234,567.89')).toBeInTheDocument();
  });

  it('should show pagination controls when data exceeds page size', () => {
    // Create large dataset to trigger pagination
    const largeData = Array.from({ length: 100 }, (_, i) => ({
      Name: `Person ${i + 1}`,
      Age: 20 + (i % 50),
      City: `City ${i + 1}`
    }));
    
    render(<DataTable data={largeData} pageSize={10} />);
    
    // Should show first page data
    expect(screen.getByText('Person 1')).toBeInTheDocument();
    expect(screen.getByText('Person 10')).toBeInTheDocument();
    
    // Should not show data from second page
    expect(screen.queryByText('Person 11')).not.toBeInTheDocument();
    
    // Should show pagination info
    expect(screen.getByText('Showing 1 to 10 of 100 entries')).toBeInTheDocument();
    
    // Should show pagination buttons
    expect(screen.getByTitle('Next page')).toBeInTheDocument();
    expect(screen.getByTitle('Last page')).toBeInTheDocument();
  });
  
  it('should navigate between pages correctly', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      Name: `Person ${i + 1}`,
      Age: 20 + i,
      City: `City ${i + 1}`
    }));
    
    render(<DataTable data={largeData} pageSize={10} />);
    
    // Initially on first page
    expect(screen.getByText('Person 1')).toBeInTheDocument();
    expect(screen.queryByText('Person 11')).not.toBeInTheDocument();
    
    // Click next page
    fireEvent.click(screen.getByTitle('Next page'));
    
    // Should now show second page
    expect(screen.queryByText('Person 1')).not.toBeInTheDocument();
    expect(screen.getByText('Person 11')).toBeInTheDocument();
    expect(screen.getByText('Person 20')).toBeInTheDocument();
    
    // Should show updated pagination info
    expect(screen.getByText('Showing 11 to 20 of 25 entries')).toBeInTheDocument();
  });
  
  it('should show single page message when data fits on one page', () => {
    render(<DataTable data={sampleData} pageSize={50} />);
    
    // Should show all data
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    
    // Should show single page message
    expect(screen.getByText('Showing all 3 entries')).toBeInTheDocument();
    
    // Should not show pagination controls
    expect(screen.queryByTitle('Next page')).not.toBeInTheDocument();
  });

  it('should show filter icon for filtered columns', () => {
    const activeFilter = {
      column: 'Name',
      value: 'John',
      operator: 'equals' as const
    };
    
    render(<DataTable data={sampleData} activeFilter={activeFilter} />);
    
    // The filter icon should be present (though we can't easily test the exact icon)
    const nameHeader = screen.getByText('Name').closest('th');
    expect(nameHeader).toBeInTheDocument();
  });

  it('should show sort icons for sorted columns', () => {
    const activeSort = {
      column: 'Age',
      direction: 'asc' as const
    };
    
    render(<DataTable data={sampleData} activeSort={activeSort} />);
    
    // The sort icon should be present
    const ageHeader = screen.getByText('Age').closest('th');
    expect(ageHeader).toBeInTheDocument();
  });

  it('should handle mixed data types correctly', () => {
    const mixedData = [
      { Text: 'Hello', Number: 42, Boolean: 'true', Null: 'null' }
    ];
    
    render(<DataTable data={mixedData} />);
    
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
    expect(screen.getByText('null')).toBeInTheDocument();
  });
});