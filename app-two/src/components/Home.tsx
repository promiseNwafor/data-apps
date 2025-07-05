import { useState } from 'react'
import { DynamicElementInspector } from './DynamicElementInspector'
import { ElementPreview } from './ElementPreview'
import { mockDesignElement, mockElementSchema } from '@/types/mock-data'
import type { DesignElement } from '@/types/design-element'

const Home = () => {
  const [selectedElement, setSelectedElement] =
    useState<DesignElement>(mockDesignElement)

  const handleElementChange = (updatedElement: DesignElement) => {
    setSelectedElement(updatedElement)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DynamicElementInspector
          selectedElement={selectedElement}
          schema={mockElementSchema}
          onElementChange={handleElementChange}
        />

        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Design Element Inspector</h1>
          <p className="text-gray-600 mb-6">
            Modify the properties in the panel on the left to see real-time
            updates.
          </p>

          <ElementPreview element={selectedElement} />
        </div>
      </div>
    </div>
  )
}

export default Home
