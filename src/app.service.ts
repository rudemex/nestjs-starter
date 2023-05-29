import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { UtilsService } from './utils/services/utils.service';

import { config } from './config';
import { HttpClientService } from '@tresdoce-nestjs-toolkit/http-client';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
    private utilsService: UtilsService,
    private readonly httpClient: HttpClientService,
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

  async trace() {
    try {
      const { data } = await this.httpClient.get(encodeURI('http://localhost:8080/v1/characters'));

      return data;
    } catch (error) /* istanbul ignore next */ {
      throw new HttpException(error.message, error.response.status);
    }
  }
}
