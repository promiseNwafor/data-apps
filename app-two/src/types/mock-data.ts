import type { DesignElement, PropertySchema } from './design-element'

export const mockElementSchema: PropertySchema = {
  x: {
    type: 'number',
    label: 'X Position',
    min: 0,
    required: true,
  },
  y: {
    type: 'number',
    label: 'Y Position',
    min: 0,
    required: true,
  },
  width: {
    type: 'number',
    label: 'Width',
    min: 1,
    required: true,
  },
  height: {
    type: 'number',
    label: 'Height',
    min: 1,
    required: true,
  },
  color: {
    type: 'color',
    label: 'Background Color',
    required: true,
  },
  text: {
    type: 'string',
    label: 'Text Content',
    required: false,
  },
  isVisible: {
    type: 'boolean',
    label: 'Visible',
    required: true,
  },
}

export const mockDesignElement: DesignElement = {
  id: 'element-1',
  name: 'Rectangle',
  properties: {
    x: 100,
    y: 50,
    width: 200,
    height: 150,
    color: '#3b82f6',
    text: 'Hello World',
    isVisible: true,
  },
}
