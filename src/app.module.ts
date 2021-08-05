import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { HttpClientModule } from '@td-nest-capabilities/http-client';

import { AppController } from '@app.controller';
import { AppService } from '@app.service';
import { CharactersModule } from '@characters/characters.module';

import { enviroments } from '@enviroments';
import config from '@config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        TEST_KEY: Joi.string().required(),
        CONTEXT: Joi.string().required(),
        RICK_AND_MORTY_API_URL: Joi.string().required(),
      }),
    }),
    HttpClientModule.httpClient(),
    CharactersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
