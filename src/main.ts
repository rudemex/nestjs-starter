import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { corePathsExcludes } from '@tresdoce-nestjs-toolkit/core';
import { ExceptionsFilter } from '@tresdoce-nestjs-toolkit/filters';

import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  const { server, swagger, project } = config();

  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });

  app.setGlobalPrefix(`${server.context}`, {
    exclude: corePathsExcludes,
  });

  app.use([cookieParser(), helmet(), compression()]);
  app.useGlobalFilters(new ExceptionsFilter(config()));

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
      .setExternalDoc('Documentation', project.documentation)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'authorization',
          description: 'Enter JWT token',
          in: 'header',
        },
        'access-token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${swagger.path}`, app, document);
  }

  if (server.corsEnabled) {
    app.enableCors({
      origin: server.origins,
      allowedHeaders: `${server.allowedHeaders}`,
      methods: `${server.allowedMethods}`,
      credentials: server.corsCredentials,
    });
  }

  await app.listen(server.port, async () => {
    await console.log(`App running on: http://localhost:${server.port}`);
  });
}
bootstrap();
