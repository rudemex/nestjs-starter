import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

import { FilterCharacter } from '../dtos/character.dto';

import { config } from '../../config';

@Injectable()
export class CharactersService {
  constructor(
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
    private readonly httpClient: HttpService,
  ) {}

  async getCharacter(params?: FilterCharacter) {
    try {
      const { data } = await this.httpClient
        .get(encodeURI(`${this.appConfig.services.rickAndMortyAPI}/character`), { params })
        .toPromise();
      return data;
    } catch (error) {
      return error;
    }
  }
}
