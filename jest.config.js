process.env.NODE_ENV = 'test';

require('dotenv').config({
  path: '.env.test',
});

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  forceExit: true,
  verbose: true,
  rootDir: '.',
  testRegex: '.*\\.(spec|it|test|e2e)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  roots: ['<rootDir>/src/'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['node_modules', 'node_modules/*'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js', 'jest-extended'],
  moduleDirectories: ['node_modules'],
  preset: 'ts-jest',
};
