/* eslint-disable dot-notation */
const path = require('path');
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack(config) {
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['services'] = path.join(__dirname, 'services');
    config.resolve.alias['data'] = path.join(__dirname, 'data');
    config.resolve.alias['containers'] = path.join(__dirname, 'containers');
    return config;
  },
});
