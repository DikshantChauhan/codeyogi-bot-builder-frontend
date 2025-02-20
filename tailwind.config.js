/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        // Dark background
        background: '#0A0A0A',

        // Primary colors - A vibrant blue shade
        primary: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0066FF', // Base primary color
          600: '#2563eb',
          700: '#003D99',
          800: '#002966',
          900: '#001433',
        },

        // Secondary colors - A purple accent
        secondary: {
          50: '#F2E6FF',
          100: '#E6CCFF',
          200: '#CC99FF',
          300: '#B366FF',
          400: '#9933FF',
          500: '#8000FF', // Base secondary color
          600: '#6600CC',
          700: '#4D0099',
          800: '#330066',
          900: '#1A0033',
        },

        // Tertiary colors - A teal accent
        tertiary: {
          50: '#E6FFF9',
          100: '#CCFFF4',
          200: '#99FFE9',
          300: '#66FFDE',
          400: '#33FFD3',
          500: '#00FFC8', // Base tertiary color
          600: '#00CCA0',
          700: '#009978',
          800: '#006650',
          900: '#003328',
        },
      },
    },
  },
  plugins: [],
}
