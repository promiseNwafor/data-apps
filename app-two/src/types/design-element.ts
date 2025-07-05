export type PropertyType = 'number' | 'string' | 'color' | 'boolean'

export interface PropertyDefinition {
  type: PropertyType
  label: string
  min?: number
  max?: number
  required?: boolean
}

export interface DesignElement {
  id: string
  name: string
  properties: Record<string, unknown>
}

export interface PropertySchema {
  [key: string]: PropertyDefinition
}

export interface ValidationError {
  property: string
  message: string
}
