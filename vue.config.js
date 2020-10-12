const plugins = []

if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  configureWebpack: {
    plugins
  }
}
