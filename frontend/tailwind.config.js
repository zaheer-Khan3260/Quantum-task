/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "primary-gradient" : 'linear-gradient(to top, #00B7B4, #007885)',
      }
    },
  },
  plugins: [],
}