import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientModule } from '@tresdoce-nestjs-toolkit/http-client';
import type { Typings } from '@tresdoce-nestjs-toolkit/paas';
import path from 'node:path';
import fs from 'node:fs';

import { CharactersService } from '../services/characters.service.js';

import { config, validationSchema } from '../../config/index.js';
import { createMock } from '@tresdoce-nestjs-toolkit/test-utils';
import { CharacterGender, CharacterStatus, FilterCharacter } from '../dtos/character.dto.js';

const readFixtureFile = (filePath: string) => {
  const absolutePath = path.resolve(import.meta.dirname, filePath);
  const fileContents = fs.readFileSync(absolutePath, 'utf8');
  return JSON.parse(fileContents);
};

describe('CharactersService', () => {
  let app: INestApplication;
  let service: CharactersService;
  let appConfig: Typings.AppConfig;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
          ignoreEnvFile: false,
          load: [config],
          isGlobal: true,
          validationSchema,
        }),
        HttpClientModule,
      ],
      providers: [CharactersService],
    }).compile();

    app = moduleRef.createNestApplication();
    service = moduleRef.get<CharactersService>(CharactersService);
    await app.init();
    appConfig = app.get<Typings.AppConfig>(config.KEY);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should be return characters without params', async () => {
    createMock({
      url: `${appConfig.services.rickAndMortyAPI.url}/character`,
      method: 'get',
      statusCode: 200,
      options: {
        encodedQueryParams: true,
      },
      responseBody: readFixtureFile('../../../fixtures/characters/response-200.json'),
    });

    const characters = await service.getCharacter();
    expect(characters).toBeDefined();
    expect(characters).toEqual(expect.any(Object));
    expect(characters).toHaveProperty('info');
    expect(characters.info).toHaveProperty('count', 826);
    expect(characters.info).toHaveProperty('pages', 42);
    expect(characters.info).toHaveProperty('next');
    expect(characters.info).toHaveProperty('prev');
    expect(characters).toHaveProperty('results');
    expect(characters.results.length).toBeGreaterThan(0);
    expect(characters.results[0]).toHaveProperty('id');
    expect(characters.results[0]).toHaveProperty('name');
    expect(characters.results[0]).toHaveProperty('status');
    expect(characters.results[0]).toHaveProperty('species');
    expect(characters.results[0]).toHaveProperty('type');
    expect(characters.results[0]).toHaveProperty('gender');
    expect(characters.results[0]).toHaveProperty('origin');
    expect(characters.results[0]).toHaveProperty('location');
    expect(characters.results[0]).toHaveProperty('image');
    expect(characters.results[0]).toHaveProperty('episode');
    expect(characters.results[0]).toHaveProperty('url');
    expect(characters.results[0]).toHaveProperty('created');
  });

  it('should be return characters with params', async () => {
    const params: FilterCharacter = {
      page: 1,
      name: 'rick',
      status: CharacterStatus.Dead,
      gender: CharacterGender.Male,
    };
    createMock({
      url: `${appConfig.services.rickAndMortyAPI.url}/character`,
      method: 'get',
      statusCode: 200,
      options: {
        encodedQueryParams: true,
      },
      queryParams: { ...params },
      responseBody: readFixtureFile('../../../fixtures/characters/response-params-200.json'),
    });

    const characters = await service.getCharacter(params);
    expect(characters).toBeDefined();
    expect(characters).toEqual(expect.any(Object));
    expect(characters).toHaveProperty('info');
    expect(characters.info).toHaveProperty('count', 54);
    expect(characters.info).toHaveProperty('pages', 3);
    expect(characters.info).toHaveProperty('next');
    expect(characters.info).toHaveProperty('prev');
    expect(characters).toHaveProperty('results');
    expect(characters.results.length).toBeGreaterThan(0);
    expect(characters.results[0]).toHaveProperty('id');
    expect(characters.results[0]).toHaveProperty('name');
    expect(characters.results[0]).toHaveProperty('status');
    expect(characters.results[0]).toHaveProperty('species');
    expect(characters.results[0]).toHaveProperty('type');
    expect(characters.results[0]).toHaveProperty('gender');
    expect(characters.results[0]).toHaveProperty('origin');
    expect(characters.results[0]).toHaveProperty('location');
    expect(characters.results[0]).toHaveProperty('image');
    expect(characters.results[0]).toHaveProperty('episode');
    expect(characters.results[0]).toHaveProperty('url');
    expect(characters.results[0]).toHaveProperty('created');
  });

  it('should be return characters exception with invalid params', async () => {
    createMock({
      url: `${appConfig.services.rickAndMortyAPI.url}/character`,
      method: 'get',
      statusCode: 404,
      options: {
        encodedQueryParams: true,
      },
      queryParams: {
        page: 9999,
      },
      responseBody: readFixtureFile('../../../fixtures/characters/response-404.json'),
    });
    const request = service.getCharacter({ page: 9999 });

    await expect(request).rejects.toBeInstanceOf(HttpException);
    await expect(request).rejects.toMatchObject({
      status: HttpStatus.NOT_FOUND,
      response: { error: 'There is nothing here' },
    });
  });
});
