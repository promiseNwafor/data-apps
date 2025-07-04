import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Statistics {
  average: number
  minimum: number
  maximum: number
}

interface StatisticsCardProps {
  statistics: Statistics
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ statistics }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2" aria-live="polite">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm sm:text-base">Average:</span>
            <span className="font-semibold text-sm sm:text-base" aria-label={`Average: ${statistics.average}`}>
              {statistics.average}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm sm:text-base">Minimum:</span>
            <span className="font-semibold text-sm sm:text-base" aria-label={`Minimum: ${statistics.minimum}`}>
              {statistics.minimum}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm sm:text-base">Maximum:</span>
            <span className="font-semibold text-sm sm:text-base" aria-label={`Maximum: ${statistics.maximum}`}>
              {statistics.maximum}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard