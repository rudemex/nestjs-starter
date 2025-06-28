import { jestConfig } from '@tresdoce-nestjs-toolkit/commons';
import type { Config } from 'jest';
import * as dotenv from 'dotenv';

process.env.NODE_ENV = 'test';

dotenv.config({
  path: '.env.test',
});

const config: Config = {
  ...jestConfig(),
  //globalSetup: './jest.globalSetup.ts',
  //globalTeardown: './jest.globalTeardown.ts',
};

export default config;
