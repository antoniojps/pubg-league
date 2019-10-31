const path = require('path')
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  webpack(config, options) {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['services'] = path.join(__dirname, 'services')
    return config
  }
})
