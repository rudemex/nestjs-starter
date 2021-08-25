import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    server: {
      port: parseInt(process.env.PORT, 10),
      context: process.env.CONTEXT,
      origins: process.env.ORIGINS,
      allowedHeaders: process.env.ALLOWED_HEADERS,
      allowedMethods: process.env.ALLOWED_METHODS,
      corsEnabled: process.env.CORS_ENABLED.toLowerCase() === 'true',
      corsCredentials: process.env.CORS_CREDENTIALS.toLowerCase() === 'true',
    },
    swagger: {
      path: process.env.SWAGGER_PATH,
      enabled: process.env.SWAGGER_ENABLED.toLowerCase() === 'true',
    },
    params: {
      testEnv: process.env.TEST_KEY,
    },
    services: {
      rickAndMortyAPI: process.env.RICK_AND_MORTY_API_URL,
    },
  };
});
