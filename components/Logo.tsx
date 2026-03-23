import Image from 'next/image'

interface LogoProps {
  variant?: 'color' | 'white'
  className?: string
}

const Logo = ({ variant = 'color', className = '' }: LogoProps) => {
  return (
    <Image
      src="/ra-logo.jpeg"
      alt="R A Pro Cleaning Services Logo"
      width={160}
      height={80}
      className={`object-contain ${variant === 'white' ? 'brightness-0 invert' : ''} ${className}`}
      priority
    />
  )
}

export default Logo
