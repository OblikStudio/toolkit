const { resolve } = require('path')

module.exports = {
  entry: './js/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'oblik.js',
    library: 'Oblik'
  }
}
