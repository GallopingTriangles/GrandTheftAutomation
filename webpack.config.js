var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: __dirname + '/src/client/views/index.html',
  inject: 'body'
})

var CopyWebpackPlugin = require('copy-webpack-plugin');
var CopyWebpackPluginConfig = new CopyWebpackPlugin([
  {
    from: __dirname + '/src/client/app/game/assets',
    to: 'assets'
  },
  {
    from: __dirname + '/src/client/styles/styles.css',
    to: 'assets/css'
  }
])

module.exports = {
  entry: __dirname + '/src/client/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: __dirname + '/src',
        loaders: [
          'babel'
        ]
      },
      {
        test: /\.jsx?$/,
        include: __dirname + '/src',
        loaders: [
          'babel'
        ]
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    CopyWebpackPluginConfig
  ]
}