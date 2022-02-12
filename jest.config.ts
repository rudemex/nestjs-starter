import { jestConfig } from '@tresdoce/nestjs-commons';
import * as dotenv from 'dotenv';

process.env.NODE_ENV = 'test';

dotenv.config({
  path: '.env.test',
});

module.exports = jestConfig;
