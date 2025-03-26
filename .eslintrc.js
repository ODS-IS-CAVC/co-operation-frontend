module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['simple-import-sort', 'react'],
  extends: ['eslint:recommended', 'prettier', 'plugin:@next/next/recommended'],
  rules: {
    // Import sorting rules
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'no-useless-catch': 'off',
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
};
