import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DynamicElementInspector from '../DynamicElementInspector';
import type { ElementProperties } from '@/types';

const formSchema = z.object({
  x: z.number().min(0, "X must be non-negative").max(5000, "X cannot exceed 5000px"),
  y: z.number().min(0, "Y must be non-negative").max(5000, "Y cannot exceed 5000px"),
  width: z.number().min(1, "Width must be at least 1px").max(2000, "Width cannot exceed 2000px"),
  height: z.number().min(1, "Height must be at least 1px").max(2000, "Height cannot exceed 2000px"),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color"),
  text: z.string().min(1, "Text cannot be empty"),
  isVisible: z.boolean(),
});

const TestWrapper = ({ children, defaultValues }: { 
  children: React.ReactNode; 
  defaultValues: ElementProperties;
}) => {
  const form = useForm<ElementProperties>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      {children}
    </FormProvider>
  );
};

const defaultProps: ElementProperties = {
  x: 50,
  y: 100,
  width: 150,
  height: 100,
  color: '#3b82f6',
  text: 'Test Element',
  isVisible: true,
};

describe('DynamicElementInspector - Basic Functionality', () => {
  it('should render all form fields', () => {
    render(
      <TestWrapper defaultValues={defaultProps}>
        <DynamicElementInspector />
      </TestWrapper>
    );

    // Check that all inputs are rendered
    expect(screen.getByRole('spinbutton', { name: /x/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /y/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /width/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /height/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/color hex code/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter text content/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /visible/i })).toBeInTheDocument();
  });

  it('should display default values', () => {
    render(
      <TestWrapper defaultValues={defaultProps}>
        <DynamicElementInspector />
      </TestWrapper>
    );

    const xInput = screen.getByRole('spinbutton', { name: /x/i }) as HTMLInputElement;
    const textInput = screen.getByPlaceholderText(/enter text content/i) as HTMLInputElement;
    const colorInput = screen.getByLabelText(/color hex code/i) as HTMLInputElement;
    const visibilityCheckbox = screen.getByRole('checkbox', { name: /visible/i }) as HTMLInputElement;

    expect(xInput.value).toBe('50');
    expect(textInput.value).toBe('Test Element');
    expect(colorInput.value).toBe('#3b82f6');
    expect(visibilityCheckbox.checked).toBe(true);
  });

  it('should allow changing input values', () => {
    render(
      <TestWrapper defaultValues={defaultProps}>
        <DynamicElementInspector />
      </TestWrapper>
    );

    const xInput = screen.getByRole('spinbutton', { name: /x/i }) as HTMLInputElement;
    const textInput = screen.getByPlaceholderText(/enter text content/i) as HTMLInputElement;

    fireEvent.change(xInput, { target: { value: '100' } });
    fireEvent.change(textInput, { target: { value: 'Updated Text' } });

    expect(xInput.value).toBe('100');
    expect(textInput.value).toBe('Updated Text');
  });
});