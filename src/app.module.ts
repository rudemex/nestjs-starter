import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArchetypeModule } from '@tresdoce-nestjs-toolkit/archetype';
import { HealthModule } from '@tresdoce-nestjs-toolkit/paas';
import { HttpClientModule } from '@tresdoce-nestjs-toolkit/http-client';

import { UtilsModule } from './utils/utils.module';
import { UsersModule } from './users/users.module';
import { CharactersModule } from './characters/characters.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { config, environments, validationSchema } from './config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

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
    HttpClientModule,
    UtilsModule,
    CharactersModule,
    UsersModule,
    PrometheusModule.register({
      defaultLabels: {
        app: 'nestjs-starter',
      },
      pushgateway: {
        url: 'https://tresdoce-prometheus.up.railway.app',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
