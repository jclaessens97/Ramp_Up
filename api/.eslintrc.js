module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-await-in-loop': 'off',
    'class-methods-use-this': 'off',
    'max-len': [2, 150, 4],
    'no-plusplus': 'off',
  },
};
