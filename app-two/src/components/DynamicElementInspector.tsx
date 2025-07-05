import { useState } from 'react'
import type {
  DesignElement,
  PropertySchema,
  ValidationError,
} from '@/types/design-element'
import { PropertyInput } from './PropertyInput'

interface DynamicElementInspectorProps {
  selectedElement: DesignElement
  schema: PropertySchema
  onElementChange?: (element: DesignElement) => void
}

export function DynamicElementInspector({
  selectedElement,
  schema,
  onElementChange,
}: DynamicElementInspectorProps) {
  const [element, setElement] = useState<DesignElement>(selectedElement)
  const [validationErrors, setValidationErrors] = useState<
    Record<string, ValidationError | null>
  >({})

  const handlePropertyChange = (key: string, value: unknown) => {
    const updatedElement = {
      ...element,
      properties: {
        ...element.properties,
        [key]: value,
      },
    }
    setElement(updatedElement)
    onElementChange?.(updatedElement)
  }

  const handleValidationChange = (
    key: string,
    error: ValidationError | null
  ) => {
    setValidationErrors((prev) => ({
      ...prev,
      [key]: error,
    }))
  }

  const hasValidationErrors = Object.values(validationErrors).some(
    (error) => error !== null
  )

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Property Inspector</h2>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          {element.name} (ID: {element.id})
        </h3>
        {hasValidationErrors && (
          <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
            Please fix validation errors before changes take effect
          </div>
        )}
      </div>

      <div className="space-y-4">
        {Object.entries(element.properties).map(([key, value]) => {
          const propertyDef = schema[key]
          if (!propertyDef) return null

          return (
            <PropertyInput
              key={key}
              propertyKey={key}
              value={value}
              definition={propertyDef}
              onChange={handlePropertyChange}
              onValidationChange={handleValidationChange}
            />
          )
        })}
      </div>
    </div>
  )
}
