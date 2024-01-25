module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  },
  plugins: ["simple-import-sort"],
};