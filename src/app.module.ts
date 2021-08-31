import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthModule } from './health/health.module';
import { UtilsModule } from './utils/utils.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';

import { config, enviroments, validationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[`${process.env.NODE_ENV}`] || '.env',
      ignoreEnvFile: process.env.IGNORE_ENV_FILE.toLowerCase() === 'true' || false,
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    HealthModule,
    UtilsModule,
    CharactersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
