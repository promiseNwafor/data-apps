import type { PropertyDefinition, ValidationError } from '@/types/design-element'

export const validateProperty = (
  key: string,
  value: unknown,
  definition: PropertyDefinition
): ValidationError | null => {
  if (
    definition.required &&
    (value === null || value === undefined || value === '')
  ) {
    return {
      property: key,
      message: `${definition.label} is required`,
    }
  }

  switch (definition.type) {
    case 'number':
      return validateNumber(key, value, definition)
    case 'color':
      return validateColor(key, value, definition)
    case 'string':
      return validateString()
    case 'boolean':
      return validateBoolean(key, value, definition)
    default:
      return null
  }
}

const validateNumber = (
  key: string,
  value: unknown,
  definition: PropertyDefinition
): ValidationError | null => {
  const num = Number(value)

  if (isNaN(num)) {
    return {
      property: key,
      message: `${definition.label} must be a valid number`,
    }
  }

  if (definition.min !== undefined && num < definition.min) {
    return {
      property: key,
      message: `${definition.label} must be at least ${definition.min}`,
    }
  }

  if (definition.max !== undefined && num > definition.max) {
    return {
      property: key,
      message: `${definition.label} must be at most ${definition.max}`,
    }
  }

  return null
}

const validateColor = (
  key: string,
  value: unknown,
  definition: PropertyDefinition
): ValidationError | null => {
  const colorValue = String(value)

  // Hex color validation regex
  const hexColorRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i

  if (!hexColorRegex.test(colorValue)) {
    return {
      property: key,
      message: `${definition.label} must be a valid hex color (e.g., #FF0000 or #F00)`,
    }
  }

  return null
}

const validateString = (
): ValidationError | null => {
  // Currently no additional string validation beyond required check
  return null
}

const validateBoolean = (
  key: string,
  value: unknown,
  definition: PropertyDefinition
): ValidationError | null => {
  if (typeof value !== 'boolean') {
    return {
      property: key,
      message: `${definition.label} must be true or false`,
    }
  }

  return null
}
