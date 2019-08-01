const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./common.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: './index.html'
    })
  ]
}

module.exports = merge(devConfig, commonConfig)