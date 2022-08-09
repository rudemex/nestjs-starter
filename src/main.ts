import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { corePathsExcludes, ExceptionsFilter } from '@tresdoce-nestjs-toolkit/paas';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });

  const appConfig = app.get<ConfigService>(ConfigService)['internalConfig']['config'];
  const { server, swagger, project } = appConfig;
  const port = parseInt(server.port, 10) || 8080;

  app.setGlobalPrefix(`${server.context}`, {
    exclude: corePathsExcludes,
  });

  app.use([cookieParser(), helmet(), compression()]);
  app.useGlobalFilters(new ExceptionsFilter(appConfig));

  app.useGlobalPipes(
    new ValidationPipe({
      validatorPackage: require('@nestjs/class-validator'),
      transformerPackage: require('class-transformer'),
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (swagger.enabled) {
    const config = new DocumentBuilder()
      .setTitle(`${project.name}`)
      .setVersion(`${project.version}`)
      .setDescription(`Swagger - ${project.description}`)
      .setExternalDoc('Documentation', project.homepage)
      .build();
    const document = SwaggerModule.createDocument(app, config, {});
    SwaggerModule.setup(`${server.context}/${swagger.path}`, app, document, {});
  }

  if (server.corsEnabled) {
    app.enableCors({
      origin: server.origins,
      allowedHeaders: `${server.allowedHeaders}`,
      methods: `${server.allowedMethods}`,
      credentials: server.corsCredentials,
    });
  }

  await app.listen(port, async () => {
    Logger.log(
      `📚 Swagger is running on: http://localhost:${port}/${server.context}/${swagger.path}`,
      `${project.name}`,
    );
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${server.context}`,
      `${project.name}`,
    );
  });
}

(async () => await bootstrap())();
