import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    // Apply to all JS files
    files: ["**/*.js"],

    languageOptions: {
      sourceType: "module", // allows import/export
      globals: {
        ...globals.browser, // window, document, etc.
        ...globals.node,    // require, module, process
        ...globals.jest,    // describe, test, expect, jest
        fetch: "readonly",  // fetch API
      },
    },

    rules: {
      // your custom rules here, e.g.
      "no-unused-vars": ["warn"],
      "no-undef": ["error"],
    },
  },
]);
