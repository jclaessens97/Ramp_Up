const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.vue',
      './src/**/*.vue',
      './index.html',
    ],
  },
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1DB954',
        'spotify-light-green': '#1ED760',
        black: '#191414',
      },
    },
  },
  variants: {},
  plugins: [],
}
