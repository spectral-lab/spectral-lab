module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: 'standard',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': process.env.NODE_ENV === 'production' ? ["error", "always"] : ["warn", "always"],
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-multiple-empty-lines': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-trailing-spaces': process.env.NODE_ENV === 'production' ? 2 : 1,
    'object-curly-spacing': process.env.NODE_ENV === 'production' ? ["error", "always"] : ["warn", "always"],
    'comma-spacing': process.env.NODE_ENV === 'production' ? 2 : 1,
    'space-before-function-paren': process.env.NODE_ENV === 'production' ? 2 : 1
  }
}
