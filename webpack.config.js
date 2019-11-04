const { resolve } = require('path')

module.exports = {
  watch: true,
  mode: 'development',
  entry: './tests/index.js',
  devServer: {
    contentBase: './tests',
    port: 5000
  },
  // output: {
  //   path: resolve(__dirname, 'build'),
  //   filename: 'oblik.js',
  //   library: 'Oblik'
  // }
}
