import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
    },
    extends: [
      pluginJs.configs.recommended,
      pluginReact.configs.flat.recommended,
      "plugin:react-hooks/recommended",
    ],
    rules: {
      "no-unused-vars": "warn", // Example of a custom rule
      "react/prop-types": "off", // Disable prop-types for now
    },
  },
];
