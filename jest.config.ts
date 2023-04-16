import { jestConfig } from '@tresdoce-nestjs-toolkit/commons';
import * as dotenv from 'dotenv';

process.env.NODE_ENV = 'test';

dotenv.config({
  path: '.env.test',
});

module.exports = {
  ...jestConfig(),
  //globalSetup: './jest.globalSetup.ts',
  //globalTeardown: './jest.globalTeardown.ts',
};
