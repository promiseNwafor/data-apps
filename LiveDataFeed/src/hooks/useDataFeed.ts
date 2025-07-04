import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { DataPoint } from '@/types/data'
import { calculateStatistics, generateDataPoint } from '@/utils/statistics'

const HISTORY_LIMIT = 20
const GENERATION_INTERVAL = 1500 // 1.5 seconds

export const useDataFeed = () => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Add a new data point and maintain history limit
  const addDataPoint = useCallback(() => {
    setDataPoints(prev => {
      const newPoint = generateDataPoint()
      const updatedPoints = [...prev, newPoint]
      
      // Keep only the last HISTORY_LIMIT points
      if (updatedPoints.length > HISTORY_LIMIT) {
        return updatedPoints.slice(-HISTORY_LIMIT)
      }
      
      return updatedPoints
    })
  }, [])

  // Start the data simulation
  const startSimulation = useCallback(() => {
    if (intervalRef.current) return
    
    setIsRunning(true)
    intervalRef.current = setInterval(addDataPoint, GENERATION_INTERVAL)
  }, [addDataPoint])

  // Stop the data simulation
  const stopSimulation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }, [])

  // Reset all data
  const resetData = useCallback(() => {
    stopSimulation()
    setDataPoints([])
  }, [stopSimulation])

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Computed values
  const latestValue = dataPoints[dataPoints.length - 1]?.value || 0
  const displayDataPoints = useMemo(() => [...dataPoints].reverse(), [dataPoints])
  const statistics = useMemo(() => calculateStatistics(dataPoints), [dataPoints])

  return {
    dataPoints,
    displayDataPoints,
    latestValue,
    statistics,
    isRunning,
    startSimulation,
    stopSimulation,
    resetData
  }
}