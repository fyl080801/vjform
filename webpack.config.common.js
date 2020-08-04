const path = require("path");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "./package"),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@vue/babel-preset-jsx"] }
      }
    ]
  },
  plugins: [new LodashModuleReplacementPlugin()]
};
