import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders live data feed', () => {
    render(<App />)
    expect(screen.getByText('Live Data Feed')).toBeInTheDocument()
    expect(screen.getByText('Latest Value')).toBeInTheDocument()
    expect(screen.getByText('Statistics')).toBeInTheDocument()
    expect(screen.getByText('Historical Data')).toBeInTheDocument()
  })
})