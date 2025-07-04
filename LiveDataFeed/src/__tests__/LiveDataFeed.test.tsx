import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LiveDataFeed from '../components/LiveDataFeed'

describe('LiveDataFeed', () => {
  it('renders initial state correctly', () => {
    render(<LiveDataFeed />)
    
    expect(screen.getByText('Live Data Feed')).toBeInTheDocument()
    expect(screen.getByText('Latest Value')).toBeInTheDocument()
    expect(screen.getByText('Statistics')).toBeInTheDocument()
    expect(screen.getByText('Historical Data')).toBeInTheDocument()
    expect(screen.getByText('No data available')).toBeInTheDocument()
    expect(screen.getByText('Start')).toBeInTheDocument()
    expect(screen.getByText('Reset')).toBeInTheDocument()
  })

  it('shows initial statistics as zeros', () => {
    render(<LiveDataFeed />)
    
    // Latest value should be 0.00, statistics should be 0
    expect(screen.getByText('0.00')).toBeInTheDocument() // Latest value
    expect(screen.getAllByText('0')).toHaveLength(3) // avg + min + max
  })

  it('changes button text when started', () => {
    render(<LiveDataFeed />)
    
    const startButton = screen.getByText('Start')
    fireEvent.click(startButton)
    
    expect(screen.getByText('Pause')).toBeInTheDocument()
    expect(screen.queryByText('Start')).not.toBeInTheDocument()
  })

  it('returns to start state when reset is clicked', () => {
    render(<LiveDataFeed />)
    
    // Start simulation
    const startButton = screen.getByText('Start')
    fireEvent.click(startButton)
    
    expect(screen.getByText('Pause')).toBeInTheDocument()
    
    // Reset
    const resetButton = screen.getByText('Reset')
    fireEvent.click(resetButton)
    
    expect(screen.getByText('Start')).toBeInTheDocument()
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })
})