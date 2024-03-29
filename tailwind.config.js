module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'base': "url('/src/assets/background.jpg')",
        'chevron-down': "url('/src/assets/chevron-down-solid.svg')"
      },
      boxShadow: {
        'inner-2': 'inset 0 2px 2px 0 rgba(0, 0, 0, 0.5)'
      },
      height: {
        88: '22rem'
      },
      minHeight: {
        8: '2rem'
      },
      maxHeight: {
        '1/2': '50%',
        '3/4': '75%',
        '4/5': '80%'
      },
      maxWidth: {
        '2xs': '16rem',
        '3/4': '75%'
      },
      inset: {
        88: '22rem'
      },
      zIndex: {
        '-10': '-10'
      }
    },
  },
  variants: {
    extend: {
      boxShadow: ['active'],
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      borderColor: ['disabled'],
      borderWidth: ['hover', 'active'],
      padding: ['active'],
      textColor: ['disabled']
    },
  },
  plugins: [],
}
