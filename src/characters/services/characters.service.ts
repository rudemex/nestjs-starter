import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpClientService } from '@tresdoce/nestjs-httpclient';

import { FilterCharacter } from '../dtos/character.dto';
import { config } from '../../config';

@Injectable()
export class CharactersService {
  constructor(
    @Inject(config.KEY) private readonly appConfig: ConfigType<typeof config>,
    private readonly httpClient: HttpClientService,
  ) {}

  async getCharacter(params?: FilterCharacter) {
    try {
      const { data } = await this.httpClient.get(
        encodeURI(`${this.appConfig.services.rickAndMortyAPI}/character`),
        {
          params,
        },
      );
      return data;
    } catch (error) /* istanbul ignore next */ {
      return error;
    }
  }
}
