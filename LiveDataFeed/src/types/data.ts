export interface DataPoint {
  id: string
  value: number
  timestamp: Date
}

export interface Statistics {
  average: number
  minimum: number
  maximum: number
}