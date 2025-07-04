import React from 'react'
import { Button } from '@/components/ui/button'

interface ControlButtonsProps {
  isRunning: boolean
  onStart: () => void
  onStop: () => void
  onReset: () => void
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ 
  isRunning, 
  onStart, 
  onStop, 
  onReset 
}) => {
  return (
    <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
      <Button 
        onClick={isRunning ? onStop : onStart}
        aria-label={isRunning ? 'Pause data generation' : 'Start data generation'}
        className="w-full sm:w-auto"
      >
        {isRunning ? 'Pause' : 'Start'}
      </Button>
      <Button 
        variant="outline" 
        onClick={onReset}
        aria-label="Reset all data and stop generation"
        className="w-full sm:w-auto"
      >
        Reset
      </Button>
    </div>
  )
}

export default ControlButtons