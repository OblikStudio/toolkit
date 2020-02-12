let path = require('path')

module.exports = (env, opts) => {
  let config = {
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

  if (opts.mode === 'production') {
    config.entry = {
      oblik: './src/index.ts'
    }

    config.output = {
      library: 'oblik',
      path: path.resolve(__dirname, 'js')
    }
  } else {
    config.entry = {
      sensor: './test/pages/sensor/script.ts',
      ticker: './test/pages/ticker/script.ts'
    }

    config.devServer = {
      contentBase: './test/pages',
      port: 5000
    }
  }

  return config
}
