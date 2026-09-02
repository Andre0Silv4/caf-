/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F1ECE3',
        'paper-dim': '#E4DED1',
        ink: '#14110C',
        'ink-soft': '#2A2419',
        'ink-muted': '#544D3F',
        clay: '#C0452A',
        'clay-soft': '#D2694E',
        'sand-muted': '#A89E8C',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { widest2: '0.28em' },
    },
  },
  plugins: [],
}
