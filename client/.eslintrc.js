/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/react',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  settings: {
    react: {
      version: 'detect'
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: ['warn', 'always'],
    indent: ['warn', 2, { 'SwitchCase': 1 }],
    'no-trailing-spaces': [1],
    'react/prop-types': [0],
    'no-unused-vars': [1],
    'no-case-declarations': [0]
  },
};
