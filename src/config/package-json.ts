import { readFileSync } from 'node:fs';

/**
 * Datos del package.json del proyecto. Se lee en runtime porque está fuera de `src`
 * (no entra en el build): la ruta es la misma desde `src/config` y desde `dist/config`.
 */
export const PACKAGE_JSON = JSON.parse(
  readFileSync(new URL('../../package.json', import.meta.url), 'utf-8'),
);
