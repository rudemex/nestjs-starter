import Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  APP_STAGE: Joi.string().required(),
  PORT: Joi.number().required(),
  API_PREFIX: Joi.string().required(),
  CONTEXT: Joi.string().required(),
  ORIGINS: Joi.string().required(),
  EXPOSED_HEADERS: Joi.string().optional(),
  ALLOWED_HEADERS: Joi.string().required(),
  ALLOWED_METHODS: Joi.string().required(),
  PROPAGATE_HEADERS: Joi.string().optional(),
  CORS_ENABLED: Joi.boolean().required(),
  CORS_CREDENTIALS: Joi.boolean().required(),
  SWAGGER_PATH: Joi.string().required(),
  SWAGGER_ENABLED: Joi.boolean().required(),
  TRACING_ENDPOINT: Joi.string().optional(),
  TRACING_AUTH_TOKEN: Joi.string().optional(),
  TEST_KEY: Joi.string().required(),
  RICK_AND_MORTY_API_URL: Joi.string().required(),
});
