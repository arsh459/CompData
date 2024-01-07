/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        iphoneX: "376px",
        pixelXl: "411px",
      },
      fontFamily: {
        mont: ["MONTH"],
        montL: ["MONTL"],
        sans: ["Avenir"],
        // bai: ["BaiBold"],
      },
    },
  },
  plugins: [],
};
