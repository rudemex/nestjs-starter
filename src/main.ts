import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@app.module';
import * as PACKAGE_JSON from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<ConfigService>(ConfigService)['internalConfig']['config'];

  app.setGlobalPrefix(`${appConfig.server.context}`);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (appConfig.swagger.enabled) {
    const config = new DocumentBuilder()
      .setTitle(`${PACKAGE_JSON.name}`)
      .setDescription(`Swagger - ${PACKAGE_JSON.description}`)
      .setVersion(`${PACKAGE_JSON.version}`)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${appConfig.swagger.path}`, app, document);
  }

  if (appConfig.server.corsEnabled) {
    app.enableCors({
      origin: appConfig.server.origins,
      allowedHeaders: `${appConfig.server.allowedHeaders}`,
      methods: `${appConfig.server.allowedMethods}`,
      credentials: appConfig.server.corsCredentials,
    });
  }
  await app.listen(appConfig.server.port || 8080);
}

bootstrap();
