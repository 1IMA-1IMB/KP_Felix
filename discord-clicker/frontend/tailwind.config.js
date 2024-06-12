/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundcolor: "#14182c",
        secondarycolor: "#182C51",
        treitarycolor: "#3b82f6",
        fourthcolor: "#88B0D8",
      },
      fontFamily: {
        'pixeltext': ['Silkscreen', 'monospace']
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(to right bottom, rgba('#7ed56f',0.8), rgba('#28b485',0.8)), url('./ai-hero.png')",
      },
    },
  },
  plugins: [
    function ({ addUtilities}) {
      const newUtilities = {
        '.scrollbar-thin': {
          'scrollbarWidth': 'thin',
          'scrollbarColor': "rgb(59 130 246) rgb(16,17,36)"
        },
        '.scrollbar-webkit': {
          "&::-webkit-scrollbar": {
            width: "8px"
          },
          '&::-webkit-scrollbar-track': {
            background: "rgb(16,17,36)"
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: "rgb(59 130 246)",
            borderRadius: "15px",
          },

        }
      }

      addUtilities(newUtilities, ["responsive", "hover"])
    }
  ],
}

