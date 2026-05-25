/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: '#0A0A0A',
        ivory: '#FAF9F6',
        gold: '#C9A227',
        goldLight: '#E8D48A',
        goldDark: '#8B7020',
        verdone: '#1B4332',
        mattone: '#8B3A3A',
        graphite: '#1C1C1E',
        smoke: '#2C2C2E',
        silver: '#8E8E93',
        pearl: '#F5F5F5',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}