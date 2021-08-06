import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { config } from '@config';

@Injectable()
export class AppService {
  constructor(@Inject(config.KEY) private appConfig: ConfigType<typeof config>) {}

  getHello(): string {
    return 'Hello World!';
  }

  getTestEnv(): string {
    return `${this.appConfig.params.testEnv}`;
  }
}
