module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: {
      test: /\.js?$/,
      include: __dirname + '/src',
      loader: [
        'babel'
      ]
    }
  }
}