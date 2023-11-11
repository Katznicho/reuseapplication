module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module:react-native-dotenv", {
      "safe": true,
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env",
    }],
    // '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
  ],
};
