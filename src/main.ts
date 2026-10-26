import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { OpenAPIObject } from '@nestjs/swagger';
import { ExceptionsFilter } from '@tresdoce-nestjs-toolkit/paas';
import type { Typings } from '@tresdoce-nestjs-toolkit/paas';
import { otelProvider } from '@tresdoce-nestjs-toolkit/tracing';

import { AppModule } from './app.module.js';
import { config, loadEnvFile } from './config/index.js';

async function bootstrap(): Promise<void> {
  loadEnvFile();
  otelProvider(config().tracing);
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  const appConfig = app.get<Typings.AppConfig>(config.KEY);
  const { server, swagger, project } = appConfig;
  const port: number = Number(server.port) || 8080;

  app.setGlobalPrefix(`${server.context}`);

  app.use([cookieParser(), compression(), helmet()]);
  app.useGlobalFilters(new ExceptionsFilter(appConfig));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (swagger.enabled) {
    const documentConfig = new DocumentBuilder()
      .setTitle(`${project.name}`)
      .setVersion(`${project.version}`)
      .setDescription(`Swagger - ${project.description}`)
      .setExternalDoc('Documentation', project.homepage)
      .setContact(project.author.name, project.author.url, project.author.email)
      .addServer(`/${server.context}`)
      .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, documentConfig, {
      ignoreGlobalPrefix: true,
      autoTagControllers: true,
    });
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

  await app.listen(port);
  const appServer: string = `http://localhost:${port}/${server.context}`;
  if (swagger.enabled) {
    Logger.log(`📚 Swagger is running on: ${appServer}/${swagger.path}`, `${project.name}`);
  }
  Logger.log(`🚀 Application is running on: ${appServer}`, `${project.name}`);
}

await bootstrap();
