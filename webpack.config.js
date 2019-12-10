let path = require('path')

module.exports = {
  watch: true,
  mode: 'development',
  entry: {
    oblik: './src/index.ts'
  },
  output: {
    library: 'oblik',
    path: path.resolve(__dirname, 'js')
  },
  devServer: {
    contentBase: './test/pages',
    port: 5000
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  }
}
