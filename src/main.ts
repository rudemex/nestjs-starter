import { NestFactory } from '@nestjs/core';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { server, swagger, project } =
    app.get<ConfigService>(ConfigService)['internalConfig']['config'];
  const port = parseInt(server.port, 10) || 8080;

  app.setGlobalPrefix(`${server.context}`, {
    exclude: [
      {
        path: '/liveness',
        method: RequestMethod.GET,
      },
      {
        path: '/readiness',
        method: RequestMethod.GET,
      },
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      validatorPackage: require('@nestjs/class-validator'),
      transformerPackage: require('@nestjs/class-transformer'),
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
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
  await app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}`);
  });
}

bootstrap();
