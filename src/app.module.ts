import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ArchetypeModule } from '@tresdoce-nestjs-toolkit/archetype';
import {
  HealthModule,
  ResponseInterceptor,
  TracingModule,
  TracingInterceptor,
} from '@tresdoce-nestjs-toolkit/paas';
import { HttpClientInterceptor, HttpClientModule } from '@tresdoce-nestjs-toolkit/http-client';

import { UtilsModule } from './utils/utils.module';
import { UsersModule } from './users/users.module';
import { CharactersModule } from './characters/characters.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { config, environments, validationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[`${process.env.NODE_ENV}`],
      ignoreEnvFile: process.env.NODE_ENV === 'production' || false,
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    ArchetypeModule,
    HealthModule,
    TracingModule,
    HttpClientModule,
    UtilsModule,
    CharactersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TracingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpClientInterceptor,
    },
  ],
})
export class AppModule {}
