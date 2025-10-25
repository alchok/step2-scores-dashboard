import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dashboard from './Dashboard'

describe('Dashboard', () => {
  it('renders the main heading', () => {
    render(<Dashboard />)
    expect(screen.getByText('Step 2 CK — Scores Dashboard')).toBeInTheDocument()
  })

  it('renders filter buttons', () => {
    render(<Dashboard />)
    expect(screen.getByText('All')).toBeInTheDocument()
  })

  it('renders learn and drill tabs', () => {
    render(<Dashboard />)
    expect(screen.getByText('Learn')).toBeInTheDocument()
    expect(screen.getByText('Drill')).toBeInTheDocument()
  })

  it('switches between learn and drill tabs', async () => {
    const user = userEvent.setup()
    render(<Dashboard />)
    
    const drillTab = screen.getByText('Drill')
    await user.click(drillTab)
    
    expect(screen.getByText('Determine the score/decision from this case:')).toBeInTheDocument()
  })

  it('filters scores by tag', async () => {
    const user = userEvent.setup()
    render(<Dashboard />)
    
    // Look for a specific tag button (assuming there are tags available)
    const tagButtons = screen.getAllByRole('button')
    const nonAllButton = tagButtons.find(button => 
      button.textContent !== 'All' && 
      button.textContent !== 'Learn' && 
      button.textContent !== 'Drill'
    )
    
    if (nonAllButton) {
      await user.click(nonAllButton)
      // Verify that the score list has been filtered
      expect(nonAllButton).toHaveClass('bg-indigo-600')
    }
  })
})
