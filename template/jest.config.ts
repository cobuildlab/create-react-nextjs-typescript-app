const { defaults } = require('jest-config');

module.exports = {
  globals: {
    ...defaults.globals,
    crypto: require('crypto'),
  },
};
