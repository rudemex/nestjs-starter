import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { ReadinessController } from '../controllers/readiness.controller';
import { ConfigModule } from '@nestjs/config';

import { config } from '../../config';
import { HttpModule } from '@nestjs/axios';

describe('ReadinessController', () => {
  let controller: ReadinessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        TerminusModule,
        ConfigModule.forRoot({
          envFilePath: '.env.test',
          load: [config],
        }),
      ],
      controllers: [ReadinessController],
    }).compile();

    controller = module.get<ReadinessController>(ReadinessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return readiness services up', async () => {
    const { services } = config();
    const pingChecks = await controller.check();

    Object.keys(services).map((key) => {
      expect(pingChecks).toHaveProperty(key, {
        status: 'up',
      });
    });
  });
});
