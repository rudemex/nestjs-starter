import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  CONTEXT: Joi.string().required(),
  ORIGINS: Joi.string().required(),
  ALLOWED_HEADERS: Joi.string().required(),
  ALLOWED_METHODS: Joi.string().required(),
  CORS_ENABLED: Joi.boolean().required(),
  CORS_CREDENTIALS: Joi.boolean().required(),
  SWAGGER_PATH: Joi.string().required(),
  SWAGGER_ENABLED: Joi.boolean().required(),
  TEST_KEY: Joi.string().required(),
  RICK_AND_MORTY_API_URL: Joi.string().required(),
  NEST_JS_DOCS_URL: Joi.string().required(),
});
