module.exports = {
  root: true,
  extends: "@react-native", // "react/jsx-runtime", // "@react-native-community",
  // quotes: [2, "single"],
  plugins: [
    "react-native",
    "react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    quotes: ["error", "double"],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    "react-native/react-native": true,
  },
};
