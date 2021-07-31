import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

import { FilterCharacter } from '@characters/dtos/character.dto';

import config from '@config';

@Injectable()
export class CharactersService {
  constructor(
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
    private readonly httpClient: HttpService,
  ) {}

  async getCharacter(params?: FilterCharacter) {
    return await this.httpClient
      .get(encodeURI(`${this.appConfig.services.rickAndMortyAPI}/character`), { params })
      .toPromise()
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
}
