module.exports = {
  root: true,
  parser: 'vue-eslint-parser',

  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint'
  },

  env: {
    browser: true,
    node: true,
    jest: true
  },

  extends: [
    'plugin:vue/recommended',
    'standard'
  ],

  globals: {
    __static: true
  },

  plugins: [
    'vue',
    "flowtype"
  ],
  rules: {
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
    'space-before-function-paren': process.env.NODE_ENV === 'production' ? 2 : 1,
    'comma-dangle': process.env.NODE_ENV === 'production' ? 2 : 1,
    'vue/require-default-prop': 0,
    'vue/no-unused-components': process.env.NODE_ENV === 'production' ? 2 : 1,
    'flowtype/define-flow-type': 1
  },
};
