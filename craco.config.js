const path = require('path');
const resolve = (arg) => path.resolve(__dirname, arg);

module.exports = function () {
  return {
    webpack: {
      alias: {
        '@': resolve('src'),
        '@redux': resolve('src/redux'),
        '@containers': resolve('src/containers'),
        '@components': resolve('src/components'),
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
