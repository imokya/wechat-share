const { merge } = require('webpack-merge')
const baseConfig = require('./base.config.js')

const config = {
  mode: 'development',
  devServer: {
    // proxy: {
    //   'http://localhost:8080': {
    //     target: 'https://auth.xinapp.net',
    //     changeOrigin: true
    //   }
    // }
  }
}

const devConfig = merge(baseConfig, config)
module.exports = devConfig
