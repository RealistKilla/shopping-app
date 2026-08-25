// https://docs.expo.dev/guides/using-eslint/
const { defineConfig, globalIgnores } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const shopifyEslintPlugin = require("@shopify/eslint-plugin");

module.exports = defineConfig([
  globalIgnores(['dist/*', '.expo/*', 'node_modules/*']),
  expoConfig,
  ...shopifyEslintPlugin.configs.typescript,
  ...shopifyEslintPlugin.configs.react,
  {
    ignores: ["dist/*"],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
    },
  },
]);
