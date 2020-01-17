module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [7016]
      }
    }
  },
  transform: {
    "\\.(ts|tsx)$": "ts-jest"
  },
  testRegex: "(src)/.*/.*(spec).(ts|tsx|js)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx"
  ]
};