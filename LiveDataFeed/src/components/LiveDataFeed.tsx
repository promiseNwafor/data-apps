import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { DataPoint } from '@/types/data'

const LiveDataFeed: React.FC = () => {
  // Mock data to get started
  const [dataPoints] = useState<DataPoint[]>([
    { id: '1', value: 45.67, timestamp: new Date('2023-01-01T10:00:00') },
    { id: '2', value: 78.23, timestamp: new Date('2023-01-01T10:01:00') },
    { id: '3', value: 32.89, timestamp: new Date('2023-01-01T10:02:00') },
    { id: '4', value: 91.45, timestamp: new Date('2023-01-01T10:03:00') },
    { id: '5', value: 56.12, timestamp: new Date('2023-01-01T10:04:00') },
  ])

  const latestValue = dataPoints[dataPoints.length - 1]?.value || 0
  
  // Basic statistics calculation inline for now
  const values = dataPoints.map(point => point.value)
  const average = values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0
  const minimum = values.length > 0 ? Math.min(...values) : 0
  const maximum = values.length > 0 ? Math.max(...values) : 0

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Live Data Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Latest Data Point */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Latest Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {latestValue.toFixed(2)}
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average:</span>
                    <span className="font-semibold">{average.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Minimum:</span>
                    <span className="font-semibold">{minimum.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maximum:</span>
                    <span className="font-semibold">{maximum.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historical Data */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Historical Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 overflow-y-auto border rounded-md p-3 bg-muted/50">
                {dataPoints.length > 0 ? (
                  <div className="space-y-1">
                    {dataPoints.map((point) => (
                      <div key={point.id} className="flex justify-between text-sm">
                        <span>{point.timestamp.toLocaleTimeString()}</span>
                        <span className="font-mono">{point.value.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-center">
                    No data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Control Buttons */}
          <div className="mt-6 flex gap-3">
            <Button>Start</Button>
            <Button variant="outline">Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LiveDataFeed