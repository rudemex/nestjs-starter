import { z } from 'zod';
import { validateSchemaForApp } from '@tresdoce-nestjs-toolkit/paas';

/**
 * Variables de entorno de la app: las base del toolkit (server, CORS, swagger, health, tracing)
 * más las propias. `@nestjs/config` 12 acepta el schema de Zod directamente.
 */
export const validationSchema = validateSchemaForApp({
  TEST_KEY: z.string(),
  RICK_AND_MORTY_API_URL: z.url(),
  RICK_AND_MORTY_API_URL_LIVENESS: z.string(),
});
