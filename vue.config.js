const webpack = require('webpack')

const publicPath = process.env.PUBLIC_PATH || '/'

module.exports = {
  publicPath,
  configureWebpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru|en/)
    ]
  }
}
