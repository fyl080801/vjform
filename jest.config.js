module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverageFrom: ['./lib/**/*.js'],
  coverageDirectory: './tests/coverage',
  setupFiles: ['./tests/setup'],
  transformIgnorePatterns: ['/node_modules/(?!(vue-hooks|lodash-es))']
}
