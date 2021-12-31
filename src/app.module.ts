import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { HealthModule } from '@tresdoce/nestjs-health';

import { UtilsModule } from './utils/utils.module';
import { UsersModule } from './users/users.module';
import { CharactersModule } from './characters/characters.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { TracingModule, TracingInterceptor } from '@tresdoce/nestjs-tracing';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TracingMiddleware, TracingModule, TracingInterceptor } from '@tresdoce/nestjs-tracing';

import { config, enviroments, validationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[`${process.env.NODE_ENV}`],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    TracingModule.forRoot({
      config: {
        serviceName: `${config().project.name}`,
        reporter: {
          agentHost: 'localhost',
          agentPort: 6832,
          logSpans: true,
        },
        sampler: {
          type: 'const',
          param: 1,
        },
      },
      options: {
        tags: {
          [`${config().project.name}`]: `${config().project.version}`,
        },
      },
    }),
    HealthModule.register(config()),
    HttpModule,
    UtilsModule,
    CharactersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /*{
      provide: APP_INTERCEPTOR,
      useClass: TracingInterceptor,
    },*/
  ],
})
//export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(TracingMiddleware)
      .exclude(
        { path: '/liveness', method: RequestMethod.ALL },
        { path: '/readiness', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
