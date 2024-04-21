/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000428",
        gray: "#eeeff1",
      },
    },
    fontFamily: {
      primary: ['"M PLUS Rounded 1c"', "sans-serif"],
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
  }),
]

};
