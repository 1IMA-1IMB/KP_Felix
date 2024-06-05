/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundcolor: "#120e22",
        secondarycolor: "#1F1544",
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
  plugins: [],
}

