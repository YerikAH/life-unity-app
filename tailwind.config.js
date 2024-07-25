/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000428",
        grey: "#eeeff1",
        midnight: {
          50: "#e4f1ff",
          100: "#cfe5ff",
          200: "#a8cdff",
          300: "#74abff",
          400: "#3e74ff",
          500: "#133fff",
          600: "#0029ff",
          700: "#0029ff",
          800: "#0025e4",
          900: "#0017b0",
          950: "#000428",
        },

        "fuel-yellow": {
          50: "#fdf8ed",
          100: "#f9eccc",
          200: "#f2d795",
          300: "#ecbc5d",
          400: "#e8aa42",
          500: "#df8621",
          600: "#c5661a",
          700: "#a44819",
          800: "#86391a",
          900: "#6e3019",
          950: "#3f1709",
        },
      },
    },
    fontFamily: {
      primary: ['"M PLUS Rounded 1c"', "sans-serif"],
    },
  },
  darkMode: "class",

  plugins: [
    require("tailwind-scrollbar"),
    require("flowbite/plugin")({
      charts: true,
    })
  ],
};
