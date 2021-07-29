import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

import config from '../../config';

@Injectable()
export class CharactersService {
  constructor(
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
    private readonly httpClient: HttpService,
  ) {}

  async getAllCharacter() {
    return await this.httpClient
      .get(`${this.appConfig.services.rickAndMortyAPI}/character`)
      .toPromise()
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
}
