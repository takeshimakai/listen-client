module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'base': "url('/src/assets/background-orig.jpg')"
      },
      boxShadow: {
        'inner-2': 'inset 0 2px 2px 0 rgba(0, 0, 0, 0.5)'
      },
      height: {
        88: '22rem'
      },
      maxHeight: {
        '1/2': '50%',
        '3/4': '75%'
      },
      maxWidth: {
        '2xs': '16rem'
      },
      inset: {
        88: '22rem'
      }
    },
  },
  variants: {
    extend: {
      boxShadow: ['active'],
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      borderWidth: ['hover']
    },
  },
  plugins: [],
}
