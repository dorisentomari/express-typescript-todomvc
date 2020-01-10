module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  rules: {
    semi: ['warn', 'always'],
    quotes: ['warn', 'single'],
    indent: ['warn', 2],
    'object-curly-spacing': ['warn', 'always'],
    'object-curly-newline': ['error', {
      'ObjectPattern': { 'multiline': true, 'minProperties': 3 },
      'ImportDeclaration': { 'multiline': true, 'minProperties': 3 },
      'ExportDeclaration': { 'multiline': true, 'minProperties': 3 }
    }],
    'max-len': ['error', { 'code': 120 }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off'
  }
};

