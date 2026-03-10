import { defineConfig, globalIgnores } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";
import prettier from "eslint-config-prettier";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

export default defineConfig(
  globalIgnores(["dist/**", "node_modules/**"]),
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [...compat.extends("airbnb-base")],
  },
  {
    files: ["**/*.ts"],
    extends: [
      ...compat.extends("airbnb-base"),
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    plugins: { unicorn },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TypeScript handles module resolution — these conflict with TS paths
      "import/no-unresolved": "off",
      "import/extensions": "off",
      // Named exports are idiomatic in TypeScript
      "import/prefer-default-export": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": "error",
      "unicorn/prefer-node-protocol": "error",
      "@typescript-eslint/no-unnecessary-type-parameters": "off",
    },
  },
  prettier,
);
