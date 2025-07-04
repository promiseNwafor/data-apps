import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LatestValueCardProps {
  value: number
}

const LatestValueCard: React.FC<LatestValueCardProps> = ({ value }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Latest Value</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="text-2xl sm:text-3xl font-bold text-primary" 
          aria-live="polite"
          aria-label={`Latest value: ${value.toFixed(2)}`}
        >
          {value.toFixed(2)}
        </div>
      </CardContent>
    </Card>
  )
}

export default LatestValueCard