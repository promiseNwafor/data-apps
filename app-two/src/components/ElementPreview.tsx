import type { DesignElement } from '@/types/design-element'

interface ElementPreviewProps {
  element: DesignElement
}

export function ElementPreview({ element }: ElementPreviewProps) {
  const { properties } = element

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${properties.x}px`,
    top: `${properties.y}px`,
    width: `${properties.width}px`,
    height: `${properties.height}px`,
    backgroundColor: properties.color as string,
    opacity: properties.isVisible ? 1 : 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#333',
    userSelect: 'none',
    transition: 'all 0.2s ease',
  }

  const text = properties.text as string

  return (
    <div className="relative w-full h-96 bg-gray-100 border-2 border-dashed border-gray-300 overflow-hidden">
      <div className="absolute top-2 left-2 text-xs text-gray-500">
        Canvas Preview
      </div>

      <div style={style}>
        {text && (
          <span className="text-white font-medium drop-shadow-sm">{text}</span>
        )}
      </div>
    </div>
  )
}
