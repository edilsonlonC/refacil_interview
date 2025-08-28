// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    plugins: {
      "@stylistic/ts": stylisticTs,
      prettier: prettierPlugin,
    },
    rules: {
      "max-len": ["error", { code: 120 }],
      "no-console": [2],
      semi: "error",
      "@stylistic/ts/indent": ["error", 2],
      //indent: ['error', 'tab',
      //{
      //MemberExpression: 1,
      //ignoredNodes: [
      //'FunctionExpression > .params[decorators.length > 0]',
      //'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
      //'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
      //],
      //},],
      quotes: [
        "error",
        "single",
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
      // "quotes": ["error", "double"],
      "no-multiple-empty-lines": [2, { max: 2 }],
      "no-mixed-spaces-and-tabs": "error",
      "no-trailing-spaces": 2,
      // indent: [2, 2, { SwitchCase: 1, CallExpression: { arguments: 2 }, MemberExpression: 2 }],
      "key-spacing": [
        2,
        {
          beforeColon: false,
        },
      ],

      "prettier/prettier": "error",
    },
    //	files: ["**/*.spec.ts", "**/*.test.ts"],
  },
  prettierConfig,
);
