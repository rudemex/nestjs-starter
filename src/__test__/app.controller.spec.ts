import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FormatService } from '@tresdoce-nestjs-toolkit/paas';
import { HttpClientModule } from '@tresdoce-nestjs-toolkit/http-client';

import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { UtilsModule } from '../utils/utils.module';

import { config, validationSchema } from '../config';

jest.setTimeout(80000);
describe('AppController', () => {
  let app: INestApplication;
  let controller: AppController;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
          ignoreEnvFile: false,
          load: [config],
          isGlobal: true,
          validationSchema,
        }),
        UtilsModule,
        HttpClientModule,
      ],
      controllers: [AppController],
      providers: [AppService, FormatService],
    }).compile();

    app = moduleRef.createNestApplication();
    controller = moduleRef.get<AppController>(AppController);
    configService = moduleRef.get<ConfigService>(ConfigService);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('should return "Hello World!"', async () => {
    expect(controller.getHello()).toBe('Hello World!');
  });

  it('should return test_key', async () => {
    expect(controller.getTestEnv()).toBe(configService.get('TEST_KEY'));
  });

  it('should return custom util', async () => {
    expect(controller.getMyUtil()).toBe('this is an util');
  });
});
