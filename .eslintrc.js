module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "react/prop-types": ["off"],
    "no-console": ["warn"],
    "no-debugger": ["warn"],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/ban-ts-comment": [
      "error",
      { "ts-ignore": "allow-with-description" },
    ],
    "import/no-default-export": ["error"],
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external", "internal"],
          "parent",
          ["sibling", "index"],
        ],
        "newlines-between": "always",
      },
    ],
    "import/newline-after-import": ["error"],
    "import/no-absolute-path": ["error"],
  },
  overrides: [
    {
      // no need to set a return type of react components and hooks - they can be usually easily inferred: https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript
      files: ["src/**/*.tsx", "src/**/use*.ts"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
      },
    },
  ],
}
