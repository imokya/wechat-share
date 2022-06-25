const path = require('path')
const HtmlWebapckPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'wechat.share.js',
    path: path.resolve(__dirname, '../dist'),
    library: {
      name: 'WechatShare',
      export: 'default',
      type: 'umd'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebapckPlugin({
      inject: false,
      scriptLoading: 'blocking',
      minify: false,
      template: './src/index.html'
    })
  ]
}
