const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const baseConfig = require('./base.config.js')

const config = {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()]
}

const prodConfig = merge(baseConfig, config)
module.exports = prodConfig
