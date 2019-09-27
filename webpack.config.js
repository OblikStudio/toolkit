const { resolve } = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'oblik.js',
    library: 'Oblik'
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
