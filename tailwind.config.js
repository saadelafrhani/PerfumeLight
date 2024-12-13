/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Path to your files
  ],
  theme: {
    extend: {
      fontFamily: {
        charm: ['Charm', 'cursive'], // Add the 'Charm' font family
      },
      colors: {
        'custom-blue': '#123859', // Custom blue color
        'custom-pink': '#b461aa', // Custom pink color
      },
      keyframes: {
        wave1: {
          '0%': { 'background-position-x': '1000px' },
          '100%': { 'background-position-x': '0px' }
        },
        wave2: {
          '0%': { 'background-position-x': '-1000px' },
          '100%': { 'background-position-x': '0px' }
        }
      },
      animation: {
        wave1: 'wave1 4s linear infinite',
        wave2: 'wave2 4s linear infinite'
      }
    },
  },
  plugins: [],
}
