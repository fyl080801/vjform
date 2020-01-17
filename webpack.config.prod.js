const path = require("path");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const common = require("./webpack.config.common");

const production = {
  entry: path.resolve(__dirname, "./package/index.js"),
  devtool: "source-map",
  mode: "production",
  optimization: {
    minimize: true
  }
};

module.exports = [
  merge(common, production, {
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "vjform.umd.js",
      libraryTarget: "umd",
      library: "VueJsonForm",
      umdNamedDefine: true
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
