import { DataPoint } from '@/types/data'

export const calculateStatistics = (dataPoints: DataPoint[]) => {
  if (dataPoints.length === 0) {
    return {
      average: 0,
      minimum: 0,
      maximum: 0
    }
  }

  const values = dataPoints.map(point => point.value)
  
  const average = values.reduce((sum, val) => sum + val, 0) / values.length
  const minimum = Math.min(...values)
  const maximum = Math.max(...values)

  return {
    average: Number(average.toFixed(2)),
    minimum: Number(minimum.toFixed(2)),
    maximum: Number(maximum.toFixed(2))
  }
}

export const generateDataPoint = (): DataPoint => {
  const now = new Date()
  return {
    id: now.getTime().toString(),
    value: Math.random() * 100,
    timestamp: now
  }
}