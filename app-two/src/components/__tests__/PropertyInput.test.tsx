import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PropertyInput } from '../PropertyInput'
import { PropertyDefinition } from '@/types/design-element'

describe('PropertyInput', () => {
  const mockOnChange = vi.fn()
  const mockOnValidationChange = vi.fn()

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('number input', () => {
    const numberDef: PropertyDefinition = {
      type: 'number',
      label: 'Width',
      min: 0,
      required: true,
    }

    it('should render number input with correct value', () => {
      render(
        <PropertyInput
          propertyKey="width"
          value={100}
          definition={numberDef}
          onChange={mockOnChange}
          onValidationChange={mockOnValidationChange}
        />
      )

      const input = screen.getByDisplayValue('100')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'number')
    })

    it('should call onChange with valid number', () => {
      render(
        <PropertyInput
          propertyKey="width"
          value={100}
          definition={numberDef}
          onChange={mockOnChange}
          onValidationChange={mockOnValidationChange}
        />
      )

      const input = screen.getByDisplayValue('100')
      fireEvent.change(input, { target: { value: '200' } })

      expect(mockOnChange).toHaveBeenCalledWith('width', 200)
      expect(mockOnValidationChange).toHaveBeenCalledWith('width', null)
    })

    it('should show validation error for negative numbers', () => {
      render(
        <PropertyInput
          propertyKey="width"
          value={100}
          definition={numberDef}
          onChange={mockOnChange}
          onValidationChange={mockOnValidationChange}
        />
      )

      const input = screen.getByDisplayValue('100')
      fireEvent.change(input, { target: { value: '-10' } })

      expect(screen.getByText('Width must be at least 0')).toBeInTheDocument()
      expect(mockOnChange).not.toHaveBeenCalled()
      expect(mockOnValidationChange).toHaveBeenCalledWith('width', {
        property: 'width',
        message: 'Width must be at least 0',
      })
    })
  })

  describe('color input', () => {
    const colorDef: PropertyDefinition = {
      type: 'color',
      label: 'Background Color',
      required: true,
    }

    it('should render color input with correct value', () => {
      render(
        <PropertyInput
          propertyKey="color"
          value="#FF0000"
          definition={colorDef}
          onChange={mockOnChange}
          onValidationChange={mockOnValidationChange}
        />
      )

      const colorInput = screen.getByDisplayValue('#FF0000')
      expect(colorInput).toBeInTheDocument()
    })

    it('should show validation error for invalid hex color', () => {
      render(
        <PropertyInput
          propertyKey="color"
          value="#FF0000"
          definition={colorDef}
          onChange={mockOnChange}
          onValidationChange={mockOnValidationChange}
        />
      )

      const textInput = screen.getByPlaceholderText('#000000')
      fireEvent.change(textInput, { target: { value: 'invalid' } })

      expect(screen.getByText(/must be a valid hex color/)).toBeInTheDocument()
      expect(mockOnChange).not.toHaveBeenCalled()
    })
  })

  describe('boolean input', () => {
    const booleanDef: PropertyDefinition = {
      type: 'boolean',
      label: 'Visible',
      required: true,
    }

    it('should render checkbox with correct value', () => {
      render(
        <PropertyInput
          propertyKey="visible"
          value={true}
          definition={booleanDef}
          onChange={mockOnChange}
          onValidationChange={mockOnValidationChange}
        />
      )

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).toBeChecked()
      expect(screen.getByText('Enabled')).toBeInTheDocument()
    })

    it('should call onChange when checkbox is toggled', () => {
      render(
        <PropertyInput
          propertyKey="visible"
          value={true}
          definition={booleanDef}
          onChange={mockOnChange}
          onValidationChange={mockOnValidationChange}
        />
      )

      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)

      expect(mockOnChange).toHaveBeenCalledWith('visible', false)
    })
  })
})
