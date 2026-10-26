import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';

import { UtilsService } from './utils/services/utils.service.js';

import { config } from './config/index.js';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
    private utilsService: UtilsService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getTestEnv(): string {
    return `${this.appConfig.params.testEnv}`;
  }

  getMyCustomUtil() {
    return this.utilsService.myCustomUtil();
  }
}
