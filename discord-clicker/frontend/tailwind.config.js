/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundcolor: "#0A131C",
        secondarycolor: "#142d46",
        treitarycolor: "#3b82f6",
        fourthcolor: "#88B0D8",
      },
      fontFamily: {
        'pixeltext': ['Silkscreen', 'monospace']
      }
    },
  },
  plugins: [],
}

