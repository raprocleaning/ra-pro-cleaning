import Image from 'next/image'

interface LogoProps {
  variant?: 'color' | 'white'
  className?: string
}

const Logo = ({ variant = 'color', className = '' }: LogoProps) => {
  return (
    <Image
      // ra-logo.jpeg with the white margin cropped off, so the mark fills the
      // space it is given. The original stays as the logo Google reads.
      src="/ra-logo-trimmed.jpeg"
      alt="R A Pro Cleaning Services Logo"
      width={938}
      height={833}
      className={`object-contain ${variant === 'white' ? 'brightness-0 invert' : ''} ${className}`}
      priority
    />
  )
}

export default Logo
