import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { UtilsModule } from '../utils/utils.module';

import { config } from '../config';

describe('AppController', () => {
  let appController: AppController;
  let configService: ConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
          load: [config],
        }),
        UtilsModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    configService = app.get<ConfigService>(ConfigService);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await appController.getHello()).toBe('Hello World!');
    });

    it('should return test_key', async () => {
      expect(await appController.getTestEnv()).toBe(configService.get('TEST_KEY'));
    });

    it('should return custom util', () => {
      expect(appController.getMyUtil()).toBe('this is an util');
    });
  });
});
