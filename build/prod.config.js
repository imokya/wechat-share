const commonConfig = require('./common.config')
const merge = require('webpack-merge')

const proConfig = {
  mode: 'production'
}

module.exports = merge(proConfig, commonConfig)