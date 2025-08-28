"use strict";
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testTimeout: 10000,
  //testPathIgnorePatterns: ['test/mock-generator'],
  //setupFiles: ['<rootDir>/.jest/set-env-vars.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  transformIgnorePatterns: ['node_modules/(?!your-module-name)'],
  //setupFiles: ['./jest.setup.ts'],
};
