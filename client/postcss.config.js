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
        '60vw': '60vw',
        '70vw': '70vw',
        '80vw': '80vw',
        '95vw': '95vw',
        
        '5vh': '5vh',
        '10vh': '10vh',
        '20vh': '20vh',
        '40vh': '40vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '85vh': '85vh',
        '90vh': '90vh',
        '95vh': '95vh',
        

      }
    },
  },
  // plugins: [require("daisyui")],
}

