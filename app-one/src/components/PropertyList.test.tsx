import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyList from './PropertyList';

const mockProperties = [
  { id: '1', key: 'color', value: 'blue' },
  { id: '2', key: 'size', value: 100 },
  { id: '3', key: 'label', value: 'Test Label' },
];

describe('PropertyList', () => {
  it('should render empty state when no properties', () => {
    const mockOnRemove = vi.fn();
    render(<PropertyList properties={[]} onRemove={mockOnRemove} />);
    
    expect(screen.getByText('No properties added yet.')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('should render properties list with correct count', () => {
    const mockOnRemove = vi.fn();
    render(<PropertyList properties={mockProperties} onRemove={mockOnRemove} />);
    
    expect(screen.getByRole('list')).toHaveAttribute('aria-label', '3 properties');
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('should display property keys, values, and types', () => {
    const mockOnRemove = vi.fn();
    render(<PropertyList properties={mockProperties} onRemove={mockOnRemove} />);
    
    // Check property keys
    expect(screen.getByText('color')).toBeInTheDocument();
    expect(screen.getByText('size')).toBeInTheDocument();
    expect(screen.getByText('label')).toBeInTheDocument();
    
    // Check property values
    expect(screen.getByText('blue')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    
    // Check property types - using getAllByText since we have multiple strings
    const stringBadges = screen.getAllByText('string');
    const numberBadges = screen.getAllByText('number');
    expect(stringBadges).toHaveLength(2); // color and label are both strings
    expect(numberBadges).toHaveLength(1); // size is a number
  });

  it('should have proper accessibility attributes', () => {
    const mockOnRemove = vi.fn();
    render(<PropertyList properties={mockProperties} onRemove={mockOnRemove} />);
    
    // Check section has proper heading
    expect(screen.getByRole('heading', { name: 'Properties' })).toBeInTheDocument();
    
    // Check list items have proper labels
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveAttribute('aria-label', 'Property color with value blue, type string');
    expect(listItems[1]).toHaveAttribute('aria-label', 'Property size with value 100, type number');
    
    // Check remove buttons have proper labels
    const removeButtons = screen.getAllByRole('button');
    expect(removeButtons[0]).toHaveAttribute('aria-label', 'Remove property color');
    expect(removeButtons[1]).toHaveAttribute('aria-label', 'Remove property size');
    expect(removeButtons[2]).toHaveAttribute('aria-label', 'Remove property label');
  });

  it('should call onRemove with correct index when remove button clicked', () => {
    const mockOnRemove = vi.fn();
    render(<PropertyList properties={mockProperties} onRemove={mockOnRemove} />);
    
    const removeButtons = screen.getAllByRole('button');
    
    // Click first remove button
    fireEvent.click(removeButtons[0]);
    expect(mockOnRemove).toHaveBeenCalledWith(0);
    
    // Click second remove button
    fireEvent.click(removeButtons[1]);
    expect(mockOnRemove).toHaveBeenCalledWith(1);
    
    expect(mockOnRemove).toHaveBeenCalledTimes(2);
  });
});