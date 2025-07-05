import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PropertyVisualization from './PropertyVisualization';

describe('PropertyVisualization', () => {
  it('should render default preview when no properties', () => {
    render(<PropertyVisualization properties={[]} />);

    expect(screen.getByText('Preview')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Add 'color', 'size', or 'label' properties to see visualization"
      )
    ).toBeInTheDocument();
  });

  it('should apply color property as background', () => {
    const properties = [{ id: '1', key: 'color', value: 'red' }];
    render(<PropertyVisualization properties={properties} />);

    const visualElement = screen.getByRole('img');
    expect(visualElement).toHaveClass('bg-[red]');
    expect(screen.getByText('Color:')).toBeInTheDocument();
    expect(screen.getByText('red')).toBeInTheDocument();
  });

  it('should apply size property as dimensions', () => {
    const properties = [{ id: '1', key: 'size', value: 120 }];
    render(<PropertyVisualization properties={properties} />);

    const visualElement = screen.getByRole('img');
    expect(visualElement).toHaveClass('w-[120px]', 'h-[120px]');
    expect(screen.getByText('Size:')).toBeInTheDocument();
    expect(screen.getByText('120px')).toBeInTheDocument();
  });

  it('should display label property as text', () => {
    const properties = [{ id: '1', key: 'label', value: 'Custom Label' }];
    render(<PropertyVisualization properties={properties} />);

    // Check that label appears in both the visual element and info section
    const labelTexts = screen.getAllByText('Custom Label');
    expect(labelTexts).toHaveLength(2); // One in visual, one in info
    expect(screen.getByText('Label:')).toBeInTheDocument();
  });

  it('should combine multiple properties', () => {
    const properties = [
      { id: '1', key: 'color', value: 'blue' },
      { id: '2', key: 'size', value: 150 },
      { id: '3', key: 'label', value: 'Test Button' },
    ];
    render(<PropertyVisualization properties={properties} />);

    const visualElement = screen.getByRole('img');
    expect(visualElement).toHaveClass('bg-[blue]', 'w-[150px]', 'h-[150px]');

    // Check label appears in both places
    const labelTexts = screen.getAllByText('Test Button');
    expect(labelTexts).toHaveLength(2);

    // Check all property info is displayed
    expect(screen.getByText('Color:')).toBeInTheDocument();
    expect(screen.getByText('blue')).toBeInTheDocument();
    expect(screen.getByText('Size:')).toBeInTheDocument();
    expect(screen.getByText('150px')).toBeInTheDocument();
    expect(screen.getByText('Label:')).toBeInTheDocument();
  });

  it('should be case insensitive for property keys', () => {
    const properties = [
      { id: '1', key: 'COLOR', value: 'green' },
      { id: '2', key: 'SIZE', value: 100 },
      { id: '3', key: 'LABEL', value: 'Upper Case' },
    ];
    render(<PropertyVisualization properties={properties} />);

    const visualElement = screen.getByRole('img');
    expect(visualElement).toHaveClass('bg-[green]', 'w-[100px]', 'h-[100px]');

    // Check label appears in both places
    const labelTexts = screen.getAllByText('Upper Case');
    expect(labelTexts).toHaveLength(2);
  });

  it('should have proper accessibility attributes', () => {
    const properties = [
      { id: '1', key: 'color', value: 'purple' },
      { id: '2', key: 'size', value: 80 },
      { id: '3', key: 'label', value: 'Accessible Button' },
    ];
    render(<PropertyVisualization properties={properties} />);

    const visualElement = screen.getByRole('img');
    expect(visualElement).toHaveAttribute('aria-label');
    expect(visualElement).toHaveAttribute('tabIndex', '0');

    // Check aria-label contains description
    const ariaLabel = visualElement.getAttribute('aria-label');
    expect(ariaLabel).toContain('background color purple');
    expect(ariaLabel).toContain('size 80 pixels');
    expect(ariaLabel).toContain('displaying text "Accessible Button"');

    // Check status region for live updates
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('should handle default values correctly', () => {
    const properties = [{ id: '1', key: 'other', value: 'irrelevant' }];
    render(<PropertyVisualization properties={properties} />);

    const visualElement = screen.getByRole('img');
    expect(visualElement).toHaveClass('bg-[slate-200]', 'w-[80px]', 'h-[80px]');
    expect(screen.getByText('Preview')).toBeInTheDocument();

    const ariaLabel = visualElement.getAttribute('aria-label');
    expect(ariaLabel).toContain('default gray background');
    expect(ariaLabel).toContain('default size 80 pixels');
    expect(ariaLabel).toContain('displaying "Preview" text');
  });

  it('should handle string size values', () => {
    const properties = [{ id: '1', key: 'size', value: '200' }];
    render(<PropertyVisualization properties={properties} />);

    const visualElement = screen.getByRole('img');
    expect(visualElement).toHaveClass('w-[200px]', 'h-[200px]');
    expect(screen.getByText('200px')).toBeInTheDocument();
  });
});
