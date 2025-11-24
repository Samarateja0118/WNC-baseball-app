/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'baseball-green': '#2e7d32',
        'baseball-brown': '#8d6e63',
        'baseball-cream': '#faf8f5',
        'nationals-red': '#C41E3A',  // primary red
        'nationals-blue': '#002D62', // secondary blue
        'baseball-green': '#2e7d32',
        'baseball-brown': '#8d6e63',
        'baseball-cream': '#faf8f5',
      },
      fontFamily: {
        'baseball': ['Roboto Condensed', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
