import { existsSync } from 'node:fs';

// List of environments
const environments = {
  test: '.env.test',
  dev: '.env.dev',
  qa: '.env.qa',
  stg: '.env.stg',
  production: '.env',
};

export const getEnvFilePath = (): string => environments[`${process.env.NODE_ENV}`];

/**
 * Carga en `process.env` el archivo `.env` del entorno actual, con las mismas reglas que el
 * `ConfigModule` (en producción no se lee archivo). Hace falta antes de crear la app: en
 * `@nestjs/config` 12 el `.env` ya no se carga al importar el `AppModule`, y `main.ts` lee
 * `config()` para iniciar el tracing antes de eso. No pisa variables ya definidas.
 */
export const loadEnvFile = (): void => {
  const envFilePath = getEnvFilePath();
  if (process.env.NODE_ENV === 'production' || !envFilePath || !existsSync(envFilePath)) return;
  process.loadEnvFile(envFilePath);
};
