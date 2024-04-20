/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000428",
        gray: "#eeeff1",
        yellow: "#E8AA42"
      },
    },
    fontFamily: {
      primary: ['"M PLUS Rounded 1c"', "sans-serif"],
    },
  },
  plugins: [],
};
