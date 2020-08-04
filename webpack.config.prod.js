const path = require("path");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const common = require("./webpack.config.common");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const production = {
  entry: path.resolve(__dirname, "./package/index.js"),
  devtool: "source-map",
  mode: "production",
  optimization: {
    minimize: true
  }
};

const plugins = [];

if (process.env.npm_config_report) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = [
  merge(common, production, {
    plugins: plugins,
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "vjform.umd.js",
      libraryTarget: "umd",
      library: "VueJsonForm",
      umdNamedDefine: true
    },
    externals: {
      vue: "Vue"
    },
    resolve: {
      alias: { vue$: "vue/dist/vue.esm.js" }
    }
  }),
  merge(common, production, {
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "vjform.esm.js",
      libraryTarget: "commonjs2",
      library: "VueJsonForm"
    }
  })
];
