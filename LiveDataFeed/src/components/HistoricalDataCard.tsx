import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { DataPoint } from '@/types/data'

interface HistoricalDataCardProps {
  dataPoints: DataPoint[]
}

const HistoricalDataCard: React.FC<HistoricalDataCardProps> = ({ dataPoints }) => {
  return (
    <Card className="mt-4 sm:mt-6">
      <CardHeader>
        <CardTitle className="text-lg">Historical Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="h-32 sm:h-40 overflow-y-auto border rounded-md p-3 bg-muted/50"
          role="log"
          aria-live="polite"
          aria-label="Historical data points"
        >
          {dataPoints.length > 0 ? (
            <div className="space-y-1">
              {dataPoints.map((point) => (
                <div key={point.id} className="flex justify-between text-xs sm:text-sm">
                  <span className="truncate mr-2">
                    {point.timestamp.toLocaleTimeString()}
                  </span>
                  <span className="font-mono flex-shrink-0">
                    {point.value.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground text-center text-sm">
              No data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default HistoricalDataCard