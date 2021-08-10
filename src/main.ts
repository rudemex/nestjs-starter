import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as PACKAGE_JSON from '../package.json';

import { AppModule } from '@app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { server, swagger } = app.get<ConfigService>(ConfigService)['internalConfig']['config'];
  const port = server.port || 8080;

  app.setGlobalPrefix(`${server.context}`);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (swagger.enabled) {
    const config = new DocumentBuilder()
      .setTitle(`${PACKAGE_JSON.name}`)
      .setDescription(`Swagger - ${PACKAGE_JSON.description}`)
      .setVersion(`${PACKAGE_JSON.version}`)
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
  await app.listen(port || 8080, () => {
    console.log(`App running on: http://localhost:${port}`);
  });
}

bootstrap();
