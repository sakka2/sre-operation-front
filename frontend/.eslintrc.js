module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
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
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'always',
      },
    ],
    'react/jsx-filename-extension': ['off'],
    'react/prop-types': ['off'],
    'no-return-assign': ['off'],
    // jsファイルがある場合は一度rulesを全てoffにして、overridesでtypespcriptへのルールを再設定
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
  },
  overrides: [
    {
      // TypeScript系ファイルへのルールを設定
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
