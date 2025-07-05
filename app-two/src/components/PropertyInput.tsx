import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type {
  PropertyDefinition,
  ValidationError,
} from '@/types/design-element'
import { validateProperty } from '@/lib/validation'

interface PropertyInputProps {
  propertyKey: string
  value: unknown
  definition: PropertyDefinition
  onChange: (key: string, value: unknown) => void
  onValidationChange?: (key: string, error: ValidationError | null) => void
}

export function PropertyInput({
  propertyKey,
  value,
  definition,
  onChange,
  onValidationChange,
}: PropertyInputProps) {
  const [error, setError] = useState<ValidationError | null>(null)
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleChange = (newValue: unknown) => {
    setInputValue(newValue)

    // Validate the new value
    const validationError = validateProperty(propertyKey, newValue, definition)
    setError(validationError)
    onValidationChange?.(propertyKey, validationError)

    // Only call onChange if the value is valid
    if (!validationError) {
      onChange(propertyKey, newValue)
    }
  }

  const getInputClassName = () => {
    const baseClass = ''
    return error
      ? `${baseClass} border-red-500 focus-visible:ring-red-500`
      : baseClass
  }

  const renderInput = () => {
    switch (definition.type) {
      case 'number':
        return (
          <Input
            type="number"
            value={inputValue as number}
            onChange={(e) => handleChange(Number(e.target.value))}
            min={definition.min}
            max={definition.max}
            required={definition.required}
            className={getInputClassName()}
          />
        )

      case 'string':
        return (
          <Input
            type="text"
            value={inputValue as string}
            onChange={(e) => handleChange(e.target.value)}
            required={definition.required}
            className={getInputClassName()}
          />
        )

      case 'color':
        return (
          <div className="flex gap-2">
            <Input
              type="color"
              value={inputValue as string}
              onChange={(e) => handleChange(e.target.value)}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={inputValue as string}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="#000000"
              className={`flex-1 ${getInputClassName()}`}
            />
          </div>
        )

      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={inputValue as boolean}
              onChange={(e) => handleChange(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-600">
              {inputValue ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        )

      default:
        return (
          <div className="text-sm text-gray-500">
            Unsupported property type: {definition.type}
          </div>
        )
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={propertyKey} className="text-sm font-medium">
        {definition.label}
        {definition.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderInput()}
      {error && (
        <div className="flex items-center gap-1 text-sm text-red-600">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <span>{error.message}</span>
        </div>
      )}
    </div>
  )
}
