const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const common = require('./webpack.config.common')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const production = {
  entry: path.resolve(__dirname, '../lib/index.js'),
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    minimize: true
  }
}

const plugins = []

if (process.env.npm_config_report) {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = [
  merge(common, production, {
    plugins,
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'index.umd.js',
      libraryTarget: 'umd',
      library: 'vjform',
      umdNamedDefine: true
    }
  }),
  merge(common, production, {
    plugins: [new CleanWebpackPlugin()],
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'index.common.js',
      libraryTarget: 'commonjs2',
      library: 'vjform'
    }
  })
]
