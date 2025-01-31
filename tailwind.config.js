/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#070705',
        secondary: '#3e4b51',
        accent: '#89a09a',
        text: '#c1c0ae',
        muted: '#6f737e',
      },
    },
  },
  plugins: [],
};