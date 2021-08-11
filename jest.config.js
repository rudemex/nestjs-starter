process.env.NODE_ENV = 'test';

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  forceExit: true,
  verbose: true,
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: ['node_modules', 'node_modules/*', 'mock', 'mock/*'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended'],
  moduleDirectories: ['node_modules'],
  preset: 'ts-jest',
};
