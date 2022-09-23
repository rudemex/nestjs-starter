import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { UtilsService } from './utils/services/utils.service';

import { config } from './config';
import { LoggingService, LOGGING_MODULE_PROVIDER } from '@tresdoce-nestjs-toolkit/logging';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
    private utilsService: UtilsService,
    @Inject(LOGGING_MODULE_PROVIDER) private readonly logger: LoggingService,
  ) {
    this.logger.setContext(AppService.name);
  }

  async getHello(): Promise<string> {
    this.logger.log('this is a log');
    return 'Hello World!';
  }

  async getTestEnv(): Promise<string> {
    return `${this.appConfig.params.testEnv}`;
  }

  getMyCustomUtil() {
    return this.utilsService.myCustomUtil();
  }
}
