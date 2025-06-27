import Joi, { ObjectSchema } from 'joi';
import { validateSchemaForApp } from '@tresdoce-nestjs-toolkit/paas';

export const validationSchema: ObjectSchema<any> = validateSchemaForApp({
  TEST_KEY: Joi.string().required(),
  RICK_AND_MORTY_API_URL: Joi.string().required(),
  RICK_AND_MORTY_API_URL_LIVENESS: Joi.string().required(),
});
