import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FAQ from '@/components/FAQ'

vi.mock('@/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({ current: null }),
  useScrollAnimationMultiple: () => ({ current: null }),
}))

vi.mock('@/lib/useAfterHours', () => ({
  useAfterHours: () => false,
}))

describe('FAQ', () => {
  it('renders all questions', () => {
    render(<FAQ />)
    expect(screen.getByText('What services do you offer?')).toBeInTheDocument()
    expect(screen.getByText('How do I book a cleaning?')).toBeInTheDocument()
    expect(screen.getByText("What's your cancellation policy?")).toBeInTheDocument()
  })

  it('starts with all items collapsed (aria-expanded=false)', () => {
    render(<FAQ />)
    const buttons = screen.getAllByRole('button', { expanded: false })
    expect(buttons.length).toBeGreaterThan(0)
    expect(screen.queryAllByRole('button', { expanded: true })).toHaveLength(0)
  })

  it('expands an item when its button is clicked', async () => {
    const user = userEvent.setup()
    render(<FAQ />)

    const button = screen.getByRole('button', { name: /what services do you offer/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})
