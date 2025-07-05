import { describe, it, expect } from 'vitest'
import { validateProperty } from '../validation'
import type { PropertyDefinition } from '@/types/design-element'

describe('validateProperty', () => {
  describe('number validation', () => {
    const numberDef: PropertyDefinition = {
      type: 'number',
      label: 'Width',
      min: 0,
      max: 1000,
      required: true,
    }

    it('should return null for valid numbers', () => {
      expect(validateProperty('width', 100, numberDef)).toBe(null)
      expect(validateProperty('width', 0, numberDef)).toBe(null)
      expect(validateProperty('width', 1000, numberDef)).toBe(null)
    })

    it('should return error for invalid numbers', () => {
      const result = validateProperty('width', 'abc', numberDef)
      expect(result).toEqual({
        property: 'width',
        message: 'Width must be a valid number',
      })
    })

    it('should return error for numbers below minimum', () => {
      const result = validateProperty('width', -10, numberDef)
      expect(result).toEqual({
        property: 'width',
        message: 'Width must be at least 0',
      })
    })

    it('should return error for numbers above maximum', () => {
      const result = validateProperty('width', 1500, numberDef)
      expect(result).toEqual({
        property: 'width',
        message: 'Width must be at most 1000',
      })
    })

    it('should return error for required empty values', () => {
      const result = validateProperty('width', '', numberDef)
      expect(result).toEqual({
        property: 'width',
        message: 'Width is required',
      })
    })
  })

  describe('color validation', () => {
    const colorDef: PropertyDefinition = {
      type: 'color',
      label: 'Background Color',
      required: true,
    }

    it('should return null for valid hex colors', () => {
      expect(validateProperty('color', '#FF0000', colorDef)).toBe(null)
      expect(validateProperty('color', '#f00', colorDef)).toBe(null)
      expect(validateProperty('color', '#123456', colorDef)).toBe(null)
      expect(validateProperty('color', '#ABC', colorDef)).toBe(null)
    })

    it('should return error for invalid hex colors', () => {
      const invalidColors = [
        'red',
        '#GG0000',
        'rgb(255,0,0)',
        '#12345',
        '#1234567',
      ]

      invalidColors.forEach((color) => {
        const result = validateProperty('color', color, colorDef)
        expect(result).toEqual({
          property: 'color',
          message:
            'Background Color must be a valid hex color (e.g., #FF0000 or #F00)',
        })
      })
    })
  })

  describe('string validation', () => {
    const stringDef: PropertyDefinition = {
      type: 'string',
      label: 'Text Content',
      required: false,
    }

    it('should return null for valid strings', () => {
      expect(validateProperty('text', 'Hello World', stringDef)).toBe(null)
      expect(validateProperty('text', '', stringDef)).toBe(null)
    })

    it('should return error for required empty strings', () => {
      const requiredStringDef: PropertyDefinition = {
        ...stringDef,
        required: true,
      }

      const result = validateProperty('text', '', requiredStringDef)
      expect(result).toEqual({
        property: 'text',
        message: 'Text Content is required',
      })
    })
  })

  describe('boolean validation', () => {
    const booleanDef: PropertyDefinition = {
      type: 'boolean',
      label: 'Visible',
      required: true,
    }

    it('should return null for valid booleans', () => {
      expect(validateProperty('visible', true, booleanDef)).toBe(null)
      expect(validateProperty('visible', false, booleanDef)).toBe(null)
    })

    it('should return error for non-boolean values', () => {
      const result = validateProperty('visible', 'true', booleanDef)
      expect(result).toEqual({
        property: 'visible',
        message: 'Visible must be true or false',
      })
    })
  })
})
