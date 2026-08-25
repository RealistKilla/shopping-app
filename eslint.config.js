// https://expo.dev
const { defineConfig, globalIgnores } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const shopifyEslintPlugin = require("@shopify/eslint-plugin");
const unusedImportsPlugin = require("eslint-plugin-unused-imports");

const shopifyTypeScriptConfigs = [...shopifyEslintPlugin.configs.typescript];
const shopifyReactConfigs = [...shopifyEslintPlugin.configs.react];

for (const config of [...shopifyTypeScriptConfigs, ...shopifyReactConfigs]) {
  if (config.plugins && "react-hooks" in config.plugins) {
    delete config.plugins["react-hooks"];
  }
}

module.exports = defineConfig([
  globalIgnores(['dist/*', '.expo/*', 'node_modules/*']),
  
  ...expoConfig, 
  ...shopifyTypeScriptConfigs,
  ...shopifyReactConfigs,

  {
    ignores: ["dist/*"],
    plugins: {
      "unused-imports": unusedImportsPlugin,
    },
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
    },
    rules: {
      // Disable Shopify's strict component boundary rules to allow for more flexible component structures
      "@shopify/strict-component-boundaries": "off",
      
      // Prevent unused variable and import errors, but allow for unused variables that start with an underscore
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { 
          "vars": "all", 
          "varsIgnorePattern": "^_", 
          "args": "after-used", 
          "argsIgnorePattern": "^_" 
        }
      ],

      // Modern React and JSX relaxations to allow for more flexible component structures
      "react/react-in-jsx-scope": "off",       // Modern JSX transforms don't need React import scope
      "react/display-name": "off",             // Allows quick anonymous component structures
      "@shopify/jsx-no-hardcoded-content": "off", // Stops errors on inline <Text> text strings
      
      // 3. Relax Over-Opinionated Formatting Restraints
      "curly": ["error", "multi-line"],       // Allows standard single-line short ifs without braces
      "id-length": "off",                      // Allows short callback values like 'e' or 'id'
      "line-comment-position": "off",          // Allows side-by-side variable comments
      "import-x/order": "off",                 // Disables strict import block clustering rules
    },
  },
]);