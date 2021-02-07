module.exports = {
  parserOptions: {
    "ecmaVersion": 6,
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  env: {
    node: true,
    "es6": true
  },
  extends: [
    'standard',
    'prettier',
    'prettier/standard',
    'plugin:jest/recommended'
  ],
  plugins: ['prettier', 'jest'],
  rules: {
    'promise/catch-or-return': 'error',
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'semi': true
      }
    ]
  }
}