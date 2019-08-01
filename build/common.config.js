const path = require('path')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/app.ts')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'wechat.share.js',
    library: 'WechatShare',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' }
    ]
  }
}