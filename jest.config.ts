import * as dotenv from 'dotenv';

process.env.NODE_ENV = 'test';

dotenv.config({
  path: '.env.test',
});

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  forceExit: true,
  verbose: true,
  rootDir: '.',
  testRegex: '.*\\.(spec|it|test|e2e|e2e-spec)\\.(t|j)s$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  roots: ['<rootDir>/test/', '<rootDir>/src/'],
  //collectCoverage: true,
  collectCoverageFrom: ['**/*.(t|j)s', '!**/*.entity.(t|j)s'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'node_modules/*',
    'dist',
    'dist/*',
    'src/main.ts',
    'src/*/entities/*',
  ],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts', 'jest-extended'],
  moduleDirectories: ['node_modules'],
  preset: 'ts-jest',
  testResultsProcessor: 'jest-sonar-reporter',
};
