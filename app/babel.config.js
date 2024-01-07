module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "react-native-dotenv",
          path: ".env",
        },
      ],
      // ["tailwindcss-react-native/babel"],
      ["nativewind/babel"],
      [
        "module-resolver",
        {
          alias: {
            "@hooks": "./src/hooks",
            "@models": "./src/models",
            "@config": "./src/config",
            "@routes": "./src/routes",
            "@screens": "./src/screens",
            "@modules": "./src/modules",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@utils": "./src/utils",
            "@providers": "./src/providers",
            "@analytics": "./src/analytics",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
