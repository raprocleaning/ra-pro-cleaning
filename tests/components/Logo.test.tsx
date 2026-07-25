import { render, screen } from '@testing-library/react'
import Logo from '@/components/Logo'

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

describe('Logo', () => {
  it('renders the logo image with the correct alt text and src', () => {
    render(<Logo />)
    const img = screen.getByAltText('R A Pro Cleaning Services Logo')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/ra-logo.jpeg')
  })

  it('applies invert class when variant is "white"', () => {
    render(<Logo variant="white" />)
    const img = screen.getByAltText('R A Pro Cleaning Services Logo')
    expect(img.className).toContain('brightness-0')
    expect(img.className).toContain('invert')
  })

  it('does not apply invert class for the default color variant', () => {
    render(<Logo />)
    const img = screen.getByAltText('R A Pro Cleaning Services Logo')
    expect(img.className).not.toContain('invert')
  })

  it('appends a custom className', () => {
    render(<Logo className="custom-cls" />)
    const img = screen.getByAltText('R A Pro Cleaning Services Logo')
    expect(img.className).toContain('custom-cls')
  })
})
