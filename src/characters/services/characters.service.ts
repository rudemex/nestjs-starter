import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpClientService } from '@tresdoce-nestjs-toolkit/http-client';

import { FilterCharacter } from '../dtos/character.dto';
import { config } from '../../config';
import { AxiosResponse } from 'axios';

@Injectable()
export class CharactersService {
  constructor(
    @Inject(config.KEY) private readonly appConfig: ConfigType<typeof config>,
    private readonly httpClient: HttpClientService,
  ) {}

  async getCharacter(params?: FilterCharacter): Promise<AxiosResponse> {
    try {
      const { data } = await this.httpClient.get(
        encodeURI(`${this.appConfig.services.rickAndMortyAPI.url}/character`),
        {
          params,
        },
      );
      return data;
    } catch (error) /* istanbul ignore next */ {
      throw new HttpException(
        {
          status: error.response.status,
          error: error.message,
        },
        error.response.status,
      );
    }
  }
}
