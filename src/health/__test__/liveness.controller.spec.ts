import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { LivenessController } from '../controllers/liveness.controller';

import { config } from '../../config';

describe('LivenessController', () => {
  let controller: LivenessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
          load: [config],
        }),
      ],
      controllers: [LivenessController],
    }).compile();

    controller = module.get<LivenessController>(LivenessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return up', () => {
    expect(controller.getLiveness()).toEqual({ status: 'up' });
  });
});
