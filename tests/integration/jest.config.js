module.exports = {
  preset: 'ts-jest',
  rootDir: process.cwd(),
  moduleFileExtensions: ['js', 'ts', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^~fixtures/(.*)$': '<rootDir>/tests/fixtures/$1',
  },
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/integration/**/*.spec.ts'],
  testURL: 'http://localhost/',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tests/tsconfig.json',
    },
  },
};
