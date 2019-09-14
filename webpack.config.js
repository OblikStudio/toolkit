const { resolve } = require('path')

module.exports = {
  watch: true,
  mode: 'development',
  devServer: {
    contentBase: './tests'
  },
  entry: {
    script: './tests/js/index.js'
  },
  output: {
    path: resolve(__dirname, './tests/js')
  },
  resolve: {
    alias: {
      '@': __dirname
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
