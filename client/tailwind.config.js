/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inconsolata: ['Inconsolata', 'monospace'],
        lato: ['Lato', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        honeydew: {
          primary: '#ffa31a',
          secondary: '#ffa32d',
        },
        // } '#ffa31a',
      },
    }
  },
  plugins: [],
  darkMode: 'class'
}
