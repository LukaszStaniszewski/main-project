const withMT = require("@material-tailwind/react/utils/withMT");
const { slate } = require("tailwindcss/colors");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "2xl": { min: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1330px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      spacing: {
        "5vw": "5vw",
        "10vw": "10vw",
        "20vw": "20vw",
        "29vw": "29vw",
        "30vw": "30vw",
        "33vw": "33vw",
        "40vw": "40vw",
        "50vw": "50vw",
        "60vw": "60vw",
        "80vw": "80vw",
        "90vw": "90vw",
        "95vw": "95vw",
        "100vw": "100vw",

        "5vh": "5vh",
        "10vh": "10vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "75vh": "75vh",
        "80vh": "80vh",
        "85vh": "85vh",
        "90vh": "90vh",
        "95vh": "95vh",
        "100vh": "100vh",
        "300vh": "300vh",

        "100%": "100%",
        "90%": "90%",
        "80%": "80%",
        "70%": "70%",
      },
      colors: {
        "color-primary": "var(--color-primary)",
        "color-secondary": "var(--color-secondary)",
        "color-tertiary": "var(--color-background-secondary)",
        "color-border-primary": "var(--color-border-primary)",
        "color-border-primary-m": "var(--color-border-primary-m)",
        "color-border-secondary": "var(--color-border-secondary)",
        "gradient-primary": "bg-gradient-to-r from-color-primary to-color-secondary",
        "color-border-main": "var(--color-border-main)",
        "color-border-main-hover": "var(--color-border-main-hover)",
        text: "var(--color-text-primaryM)",
      },
      border: {
        primary: "var(--color-border-primary)",
        "color-border-primary-m": "var(--color-border-primary-m)",
        secondary: "var(--color-border-secondary)",
        tertiary: "var(--color-border-tertiary)",
      },
      textColor: {
        primary: "var(--color-text-primary)",
        secondary: slate[600],
      },
      backgroundColor: {
        primary: "var(--color-background-primary)",
        secondary: "var(--color-background-secondary)",
      },
    },

    container: {
      center: true,
    },
  },

  plugins: [require("flowbite/plugin"), require("daisyui")],
});
