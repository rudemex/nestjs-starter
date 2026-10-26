import { vitestConfig } from '@tresdoce-nestjs-toolkit/commons';
import { defineConfig } from 'vitest/config';

const base = vitestConfig({ setupFiles: ['./vitest.setup.ts'] });

export default defineConfig({
  ...base,
  test: {
    ...base.test,
    // Unit tests only: the e2e suite (test/) calls real services and runs with `yarn test:e2e`.
    include: ['src/**/*.spec.ts'],
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
