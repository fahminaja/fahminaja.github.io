/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f5fffa',
        ink: '#16204f',
        accent: '#1d4ed8',
      },
      keyframes: {
        wave: {
          '0%, 60%, 100%': { transform: 'rotate(0deg)' },
          '10%, 30%': { transform: 'rotate(14deg)' },
          '20%, 40%': { transform: 'rotate(-8deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
      },
      fontFamily: {
        sans: ['Ubuntu', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Libre Baskerville"', 'serif'],
      },
    },
  },
  plugins: [],
}
