import { describe, it, expect } from 'vitest'
import { calculateStatistics, generateDataPoint } from '../utils/statistics'
import type { DataPoint } from '../types/data'

describe('calculateStatistics', () => {
  it('returns zeros for empty array', () => {
    const result = calculateStatistics([])
    
    expect(result).toEqual({
      average: 0,
      minimum: 0,
      maximum: 0
    })
  })

  it('calculates correct statistics for single data point', () => {
    const dataPoints: DataPoint[] = [
      { id: '1', value: 42.5, timestamp: new Date() }
    ]
    
    const result = calculateStatistics(dataPoints)
    
    expect(result).toEqual({
      average: 42.5,
      minimum: 42.5,
      maximum: 42.5
    })
  })

  it('calculates correct statistics for multiple data points', () => {
    const dataPoints: DataPoint[] = [
      { id: '1', value: 10, timestamp: new Date() },
      { id: '2', value: 20, timestamp: new Date() },
      { id: '3', value: 30, timestamp: new Date() }
    ]
    
    const result = calculateStatistics(dataPoints)
    
    expect(result).toEqual({
      average: 20,
      minimum: 10,
      maximum: 30
    })
  })

  it('rounds average to 2 decimal places', () => {
    const dataPoints: DataPoint[] = [
      { id: '1', value: 10, timestamp: new Date() },
      { id: '2', value: 15, timestamp: new Date() },
      { id: '3', value: 20, timestamp: new Date() }
    ]
    
    const result = calculateStatistics(dataPoints)
    
    expect(result.average).toBe(15)
    expect(result.minimum).toBe(10)
    expect(result.maximum).toBe(20)
  })

  it('handles decimal values correctly', () => {
    const dataPoints: DataPoint[] = [
      { id: '1', value: 10.333, timestamp: new Date() },
      { id: '2', value: 20.666, timestamp: new Date() },
      { id: '3', value: 30.999, timestamp: new Date() }
    ]
    
    const result = calculateStatistics(dataPoints)
    
    expect(result.average).toBe(20.67) // (10.333 + 20.666 + 30.999) / 3 = 20.666
    expect(result.minimum).toBe(10.33) // Rounded to 2 decimal places
    expect(result.maximum).toBe(31) // Rounded to 2 decimal places
  })

  it('handles negative values', () => {
    const dataPoints: DataPoint[] = [
      { id: '1', value: -10, timestamp: new Date() },
      { id: '2', value: 0, timestamp: new Date() },
      { id: '3', value: 10, timestamp: new Date() }
    ]
    
    const result = calculateStatistics(dataPoints)
    
    expect(result.average).toBe(0)
    expect(result.minimum).toBe(-10)
    expect(result.maximum).toBe(10)
  })
})

describe('generateDataPoint', () => {
  it('generates a data point with required fields', () => {
    const dataPoint = generateDataPoint()
    
    expect(dataPoint).toHaveProperty('id')
    expect(dataPoint).toHaveProperty('value')
    expect(dataPoint).toHaveProperty('timestamp')
    
    expect(typeof dataPoint.id).toBe('string')
    expect(typeof dataPoint.value).toBe('number')
    expect(dataPoint.timestamp).toBeInstanceOf(Date)
  })

  it('generates value between 0 and 100', () => {
    // Test multiple generations to ensure range
    for (let i = 0; i < 100; i++) {
      const dataPoint = generateDataPoint()
      expect(dataPoint.value).toBeGreaterThanOrEqual(0)
      expect(dataPoint.value).toBeLessThan(100)
    }
  })

  it('generates unique IDs based on timestamp', async () => {
    const dataPoint1 = generateDataPoint()
    // Small delay to ensure different timestamp
    await new Promise(resolve => setTimeout(resolve, 1))
    const dataPoint2 = generateDataPoint()
    
    expect(dataPoint1.id).not.toBe(dataPoint2.id)
  })

  it('generates current timestamp', () => {
    const before = Date.now()
    const dataPoint = generateDataPoint()
    const after = Date.now()
    
    const pointTime = dataPoint.timestamp.getTime()
    expect(pointTime).toBeGreaterThanOrEqual(before)
    expect(pointTime).toBeLessThanOrEqual(after)
  })
})