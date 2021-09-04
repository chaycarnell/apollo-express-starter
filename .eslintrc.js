module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@utils', './src/utils'],
          ['@db', './src/db'],
          ['@api', './src/api'],
          ['@services', './src/services'],
          ['@pubsub', './src/pubsub'],
        ],
        extensions: ['.ts', '.js', '.json'],
      },
    },
  },
};
