import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(237 28 36)',
        secondary: 'rgb(45 43 116)',
      },
      borderRadius: {
        brand: '1.25rem', // enables rounded-brand utility
      },
    },
  },
  plugins: [],
}
export default config
