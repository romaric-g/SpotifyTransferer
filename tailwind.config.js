module.exports = {
  theme: {
    fontFamily: {
      display: ['Circular, Helvetica, Arial', 'sans-serif'],
      body: ['Circular, Helvetica, Arial', 'sans-serif'],
    },
    extend: {
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
      },
      colors: {
        'green': '#1DB954',
        'lightgreen': '#1ED760',
        'darkgreen': '#1aa34a',
        'light': "#F8F8F8",
        'lightgray': '#C1C3C6',
        'darkgray': "#222326",
  
      },
      spacing: {
        '96': '24rem',
        '128': '32rem',
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
}
