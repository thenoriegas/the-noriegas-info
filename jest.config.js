module.exports = {
  cache: false,
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/tests/mocks/styleMock.js"
  }
}
