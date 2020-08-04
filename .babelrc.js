module.exports = {
  presets: [
    "@vue/app",
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["ie >=9", "last 2 version", "> 5%", "not dead"]
        },
        corejs: "3",
        useBuiltIns: "entry"
      }
    ]
  ],
  plugins: ["@babel/plugin-transform-runtime", "lodash"]
};
