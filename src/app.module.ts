import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@tresdoce/nestjs-health';
import { HttpClientModule } from '@tresdoce/nestjs-httpclient';

import { UtilsModule } from './utils/utils.module';
import { UsersModule } from './users/users.module';
import { CharactersModule } from './characters/characters.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { config, enviroments, validationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[`${process.env.NODE_ENV}`],
      ignoreEnvFile: process.env.IGNORE_ENV_FILE.toLowerCase() === 'true' || false,
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    HealthModule.register(config()),
    HttpClientModule,
    UtilsModule,
    CharactersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
