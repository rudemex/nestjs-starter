import { HttpException, Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { HttpClientService } from '@tresdoce-nestjs-toolkit/http-client';

import type { FilterCharacter } from '../dtos/character.dto.js';
import { config } from '../../config/index.js';

@Injectable()
export class CharactersService {
  constructor(
    @Inject(config.KEY) private readonly appConfig: ConfigType<typeof config>,
    @Inject(HttpClientService) private readonly httpClient: HttpClientService,
  ) {}

  async getCharacter(params?: FilterCharacter) {
    try {
      const { data } = await this.httpClient.get(
        encodeURI(`${this.appConfig.services.rickAndMortyAPI.url}/character`),
        {
          params,
        },
      );
      return data;
    } catch (error: any) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
