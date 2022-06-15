function withOpacity(variableName) {
    return ({ opacityValue }) => {
      if (opacityValue !== undefined) {
        return `rgba(var(${variableName}), ${opacityValue})`
      }
      return `rgb(var(${variableName}))`
    }
  }

module.exports = {
    
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1330px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      spacing: {
        '5vw': '5vw',
        '10vw': '10vw',
        '20vw': '20vw',
        '40vw': '40vw',
        '50vw': '50vw',
        '60vw': '60vw',
        '80vw': '80vw',
        '95vw': '95vw',
        
        '5vh': '5vh',
        '10vh': '10vh',
        '20vh': '20vh',
        '40vh': '40vh',
        '60vh': '60vh',
        '80vh': '80vh',
        '85vh': '85vh',
        '90vh': '90vh',
        '95vh': '95vh',

      },
      colors: {
        'color-primary' : 'var(--color-primary)',
        'color-secondary' : 'var(--color-secondary)',
        'color-border-primary' : 'var(--color-border-primary)',
        'color-border-secondary' : 'var(--color-border-secondary)',
      },
      border: {
        'primary' : 'var(--color-border-primary)'
      },
      textColor: {
        'primary': 'var(--color-text-primary)'
      },
      backgroundColor: {
        skin: {
           'background-primary' : 'var(--color-background-primary)',
           'background-secondary' : 'var(--color-background-secondary)',
        }
      }
    },
  },

  plugins: [
    require('flowbite/plugin'),
    require("daisyui")
  ],

}

