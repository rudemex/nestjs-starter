import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  TEST_KEY: Joi.string().required(),
  CONTEXT: Joi.string().required(),
  RICK_AND_MORTY_API_URL: Joi.string().required(),
});
