import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { UtilsService } from './utils/services/utils.service';

import { config } from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
    private utilsService: UtilsService,
  ) {}

  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  async getTestEnv(): Promise<string> {
    return `${this.appConfig.params.testEnv}`;
  }

  getMyCustomUtil() {
    return this.utilsService.myCustomUtil();
  }
}
