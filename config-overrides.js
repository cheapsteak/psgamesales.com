const { override, addBabelPlugin } = require('customize-cra');

/* config-overrides.js */
module.exports = override(addBabelPlugin('babel-plugin-lodash'));
