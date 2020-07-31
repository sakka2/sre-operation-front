module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    complexity: 'warn',
    eqeqeq: ['error', 'always'],
    'default-case': 'warn',
    'no-implicit-coercion': 'error',
    'no-magic-numbers': 'warn',
    'newline-after-var': ['error', 'always'],
    'newline-before-return': 'error',
    'react/jsx-filename-extension': ['off'],
    'react/prop-types': ['off'],
    'no-return-assign': ['off'],
    // For Override
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
  },
  overrides: [
    {
      // Only for typescripts
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-var-requires': ['error'],
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
