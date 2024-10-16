const baseTestDir = '<rootDir>/tests/jest'

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: [`${baseTestDir}/**/*.(spec|test).ts`],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
}
