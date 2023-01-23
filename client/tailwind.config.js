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
          secondary: '#fa8237   ',
        },
        // } '#ffa31a',
        ph: {
          grey: "#808080",
          lightBlack: "#292929",
          black: "#1b1b1b",
        }
      },
    }
  },
  plugins: [],
  darkMode: 'class'
}
