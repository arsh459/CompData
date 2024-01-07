module.exports = {
  // mode: "jit",
  // purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [
    "./public/**/*.html",
    "./pages/**/*{js,ts,jsx,tsx}",
    "./components/**/*{js,ts,jsx,tsx}",
    "./modules/**/*{js,ts,jsx,tsx}",
    "./templates/**/*{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        "safe-bottom": "calc(env(safe-area-inset-bottom) + 72px)",
      },
      screens: {
        xs: "320px",
        iphoneX: "376px",
        pixelXl: "411px",
        pixelXlPro: "500px",
      },
      colors: {
        orange: {
          300: "#ffba9d",
          400: "#ff9f84",
          500: "#ff735c",
          600: "#db4c43",
          700: "#b72e30",
          800: "#931d28",
        },
        smoke: {
          900: "rgba(0, 0, 0, 0.9)",
          750: "rgba(0, 0, 0, 0.75)",
          600: "rgba(0, 0, 0, 0.6)",
          500: "rgba(0, 0, 0, 0.5)",
          400: "rgba(0, 0, 0, 0.4)",
          250: "rgba(0, 0, 0, 0.25)",
          100: "rgba(0, 0, 0, 0.1)",
        },
      },
      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "rotate(-0.9deg)",
          },
          "50%": {
            transform: "rotate(0.9deg)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 0.4s ease-in-out infinite",
        wiggleFast: "wiggle 0.2s ease-in-out infinite",
        // bounce: "bounce 0.5s infinite",
      },
      fontFamily: {
        mont: ["MONTH"],
        montL: ["MONTL"],
        sans: ["Avenir"],
        baib: "BaiJamjuree-Bold",
        baiEl: "BaiJamjuree-ExtraLight",
        bail: "BaiJamjuree-Light",
        baim: "BaiJamjuree-Medium",
        bair: "BaiJamjuree-Regular",
        baiSb: "BaiJamjuree-SemiBold",
        popEL: "Poppins-ExtraLight",
        popL: "Poppins-Light",
        popR: "Poppins-Regular",
        popM: "Poppins-Medium",
        popSB: "Poppins-SemiBold",
        popB: "Poppins-Bold",
        popEB: "Poppins-ExtraBold",
        qsL: "Quicksand-Light",
        qsR: "Quicksand-Regular",
        qsM: "Quicksand-Medium",
        qsB: "Quicksand-Bold",
        qsSB: "Quicksand-SemiBold",
        nunitoEL: "Nunito-ExtraLight",
        nunitoL: "Nunito-Light",
        nunitoR: "Nunito-Regular",
        nunitoM: "Nunito-Medium",
        nunitoSB: "Nunito-SemiBold",
        nunitoB: "Nunito-Bold",
        nunitoEB: "Nunito-ExtraBold",
        nunitoM: "Nunito-Medium",
        canelaR: "Canela-Regular",
        canelaB: "Canela-Bold",
        canelaL: "Canela-Light",
        spectralEL: "Spectral-ExtraLight",
        spectralL: "Spectral-Light",
        spectralR: "Spectral-Regular",
        spectralM: "Spectral-Medium",
        spectralSB: "Spectral-SemiBold",
        spectralB: "Spectral-Bold",
        spectralEB: "Spectral-ExtraBold",
        pJSEL: "Plus-Jakarta-Sans-Extra-Light",
        pJSL: "Plus-Jakarta-Sans-Light",
        pJSM: "Plus-Jakarta-Sans-Medium",
        pJSR: "Plus-Jakarta-Sans-Regular",
        pJSSB: "Plus-Jakarta-Sans-SemiBold",
        pJSB: "Plus-Jakarta-Sans-Bold",
        pJSEB: "Plus-Jakarta-Sans-Extra-Bold",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-safe-area"),
  ],
};
