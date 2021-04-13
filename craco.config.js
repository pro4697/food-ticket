const path = require('path');
const resolve = (arg) => path.resolve(__dirname, arg);

module.exports = function () {
  return {
    webpack: {
      alias: {
        '@': resolve('src'),
        '@redux': resolve('src/redux'),
        '@utils': resolve('src/utils'),
        '@containers': resolve('src/containers'),
        '@components': resolve('src/components'),
        '@api': resolve('src/api'),
        '@styles': resolve('src/styles'),
        '@common': resolve('src/common'),
      },
    },
    jest: {
      configure: {
        moduleNameMapper: {
          '^@/(.*)$': '<rootDir>/src/$1',
        },
      },
    },
  };
};
