import unjs from 'eslint-config-unjs'

export default unjs({
  ignores: [
    // ignore paths
    'coverage',
    'dist',
    'node_modules',
    'tmp',
  ],
  rules: {
    // rule overrides
    '@typescript-eslint/no-require-imports': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-process-exit': 'off',
    'unicorn/prefer-top-level-await': 'off',
  },
  markdown: {
    rules: {
      // markdown rule overrides
    },
  },
})
