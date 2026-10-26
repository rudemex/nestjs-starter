import { vitestConfig } from '@tresdoce-nestjs-toolkit/commons';
import { defineConfig } from 'vitest/config';

const base = vitestConfig({ setupFiles: ['./vitest.setup.ts'] });

export default defineConfig({
  ...base,
  test: {
    ...base.test,
    include: ['test/**/*.e2e-spec.ts'],
    reporters: ['default'],
    coverage: { ...base.test.coverage, enabled: false },
    testTimeout: 80_000,
    hookTimeout: 80_000,
  },
});
