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
        login: '22rem'
      }
    },
  },
  variants: {
    extend: {
      boxShadow: ['active'],
      opacity: ['disabled'],
      backgroundColor: ['disabled']
    },
  },
  plugins: [],
}
