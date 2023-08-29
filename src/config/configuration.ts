import { Typings } from '@tresdoce-nestjs-toolkit/paas';
import { registerAs } from '@nestjs/config';

import * as PACKAGE_JSON from '../../package.json';

export default registerAs(
  'config',
  (): Typings.AppConfig => ({
    project: {
      apiPrefix: process.env.API_PREFIX || 'API-PREFIX',
      name: PACKAGE_JSON.name,
      version: PACKAGE_JSON.version,
      description: PACKAGE_JSON.description,
      author: PACKAGE_JSON.author,
      repository: PACKAGE_JSON.repository,
      bugs: PACKAGE_JSON.bugs,
      homepage: PACKAGE_JSON.homepage,
    },
    server: {
      isProd: process.env.NODE_ENV === 'production',
      appStage: process.env.APP_STAGE,
      port: parseInt(process.env.PORT, 10) || 8080,
      context: process.env.CONTEXT || 'v1',
      origins: process.env.ORIGINS ? process.env.ORIGINS.split(',') : '*',
      allowedHeaders: process.env.ALLOWED_HEADERS,
      allowedMethods: process.env.ALLOWED_METHODS,
      propagateHeaders: process.env.PROPAGATE_HEADERS
        ? process.env.PROPAGATE_HEADERS.split(',')
        : [],
      corsEnabled: process.env.CORS_ENABLED.toLowerCase() === 'true',
      corsCredentials: process.env.CORS_CREDENTIALS.toLowerCase() === 'true',
    },
    swagger: {
      path: process.env.SWAGGER_PATH || 'docs',
      enabled: process.env.SWAGGER_ENABLED.toLowerCase() === 'true',
    },
    tracing: {
      resourceAttributes: {
        serviceName: `${PACKAGE_JSON.name}`,
        version: PACKAGE_JSON.version,
        'service.namespace': `${process.env.API_PREFIX}`,
        'deployment.environment': process.env.APP_STAGE,
      },
      exporter: {
        url: process.env.TRACING_ENDPOINT,
        headers: {
          Authorization: `${process.env.TRACING_AUTH_TOKEN}`,
        },
      },
    },
    params: {
      testEnv: process.env.TEST_KEY,
    },
    services: {
      rickAndMortyAPI: {
        url: process.env.RICK_AND_MORTY_API_URL,
        timeout: 3000,
        healthPath: process.env.RICK_AND_MORTY_API_URL_LIVENESS,
      },
    },
  }),
);
