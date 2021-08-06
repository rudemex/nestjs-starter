import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@app.module';
import * as PACKAGE_JSON from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix(`${appConfig.get('CONTEXT')}`);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (appConfig.get('SWAGGER_ENABLED')) {
    const config = new DocumentBuilder()
      .setTitle(`${PACKAGE_JSON.name}`)
      .setDescription(`Swagger - ${PACKAGE_JSON.description}`)
      .setVersion(`${PACKAGE_JSON.version}`)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${appConfig.get('SWAGGER_PATH')}`, app, document);
  }

  if (appConfig.get('CORS_ENABLED')) {
    app.enableCors({
      origin: appConfig.get('ORIGINS').split(','),
      allowedHeaders: `${appConfig.get('ALLOWED_HEADERS')}`,
      methods: `${appConfig.get('ALLOWED_METHODS')}`,
      credentials: appConfig.get('CORS_CREDENTIALS'),
    });
  }
  await app.listen(appConfig.get('PORT') || 8080);
}

bootstrap();
