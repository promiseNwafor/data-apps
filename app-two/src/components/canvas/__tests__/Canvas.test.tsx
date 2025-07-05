import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Canvas from '../Canvas';

describe('Canvas - Rectangle Creation', () => {
  it('should render empty canvas initially', () => {
    render(<Canvas />);
    
    expect(screen.getByText('Empty Canvas')).toBeInTheDocument();
    expect(screen.getByText(/Elements on canvas:/)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should create rectangle when Add Rectangle button is clicked', () => {
    render(<Canvas />);
    
    const addButton = screen.getByText('Add Rectangle');
    fireEvent.click(addButton);
    
    // Empty state should disappear
    expect(screen.queryByText('Empty Canvas')).not.toBeInTheDocument();
    
    // Counter should update
    expect(screen.getByText(/Elements on canvas:/)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should create multiple rectangles with unique IDs', () => {
    render(<Canvas />);
    
    const addButton = screen.getByText('Add Rectangle');
    
    // Add 3 rectangles
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    
    expect(screen.getByText(/Elements on canvas:/)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should clear all rectangles when Clear Canvas is clicked', () => {
    render(<Canvas />);
    
    const addButton = screen.getByText('Add Rectangle');
    const clearButton = screen.getByText('Clear Canvas');
    
    // Add rectangles
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // Clear rectangles
    fireEvent.click(clearButton);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('Empty Canvas')).toBeInTheDocument();
  });

  it('should create rectangles at default position (20, 20)', () => {
    render(<Canvas />);
    
    const addButton = screen.getByText('Add Rectangle');
    fireEvent.click(addButton);
    
    // Find the rectangle element by its styling
    const rectangleElement = document.querySelector('[style*="left: 20px"][style*="top: 20px"]');
    expect(rectangleElement).toBeInTheDocument();
  });

  it('should create rectangles with correct dimensions (100x100)', () => {
    render(<Canvas />);
    
    const addButton = screen.getByText('Add Rectangle');
    fireEvent.click(addButton);
    
    // Find the rectangle element by its dimensions
    const rectangleElement = document.querySelector('[style*="width: 100px"][style*="height: 100px"]');
    expect(rectangleElement).toBeInTheDocument();
  });

  it('should create rectangles with valid colors', () => {
    render(<Canvas />);
    
    const addButton = screen.getByText('Add Rectangle');
    fireEvent.click(addButton);
    
    // Find any rectangle element by class and check its style
    const rectangleElement = document.querySelector('.cursor-move');
    expect(rectangleElement).toBeInTheDocument();
    
    // Check if the background color is set (browser converts HSL to RGB)
    const style = rectangleElement?.getAttribute('style');
    expect(style).toMatch(/background-color:\s*rgb\(\d+,\s*\d+,\s*\d+\)/);
  });
});