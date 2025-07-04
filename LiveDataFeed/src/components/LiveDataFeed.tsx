import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDataFeed } from '@/hooks/useDataFeed'
import LatestValueCard from './LatestValueCard'
import StatisticsCard from './StatisticsCard'
import HistoricalDataCard from './HistoricalDataCard'
import ControlButtons from './ControlButtons'

const LiveDataFeed: React.FC = () => {
  const {
    displayDataPoints,
    latestValue,
    statistics,
    isRunning,
    startSimulation,
    stopSimulation,
    resetData
  } = useDataFeed()

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Live Data Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <LatestValueCard value={latestValue} />
            <StatisticsCard statistics={statistics} />
          </div>

          <HistoricalDataCard dataPoints={displayDataPoints} />

          <ControlButtons 
            isRunning={isRunning}
            onStart={startSimulation}
            onStop={stopSimulation}
            onReset={resetData}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default LiveDataFeed