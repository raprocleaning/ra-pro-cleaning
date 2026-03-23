import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C8A96E',
        'gold-dark': '#B8935A',
        'off-white': '#F5F5F5',
        'near-white': '#FAFAFA',
        'rich-black': '#0A0A0A',
        'body-gray': '#6B6B6B',
        'border-gray': '#E0E0E0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
      },
    },
  },
  plugins: [],
}
export default config
