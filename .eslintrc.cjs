module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, 
    sourceType: 'module', 
    ecmaFeatures: {
      jsx: true, 
    },
  },
  root: true,
  env: { browser: true, es2020: true, node: true, },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['@typescript-eslint', 'prettier', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': ['error', {"endOfLine": "auto"}, { usePrettierrc: true, }],
  },
  settings: {
    react: {
      version: 'detect', 
    },
  },
}
