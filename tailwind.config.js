/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], 
        // atau: Montserrat
      },
      // misal custom warna
      colors: {
        tealDark: '#0D4C47',
        tealLight: '#27E8D9',
        roseDark: '#8B2557',
        roseLight: '#FCA5A5',
      },
    },
  },
  plugins: [],
};