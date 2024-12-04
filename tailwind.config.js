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
    },
  },
  plugins: [],
}
