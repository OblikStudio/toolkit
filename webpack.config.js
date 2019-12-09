module.exports = {
  watch: true,
  mode: 'development',
  entry: {
    oblik: './js/index.js'
  },
  output: {
    library: 'oblik'
  },
  devServer: {
    contentBase: './test/pages',
    port: 5000
  }
}
