import { Test, TestingModule } from '@nestjs/testing';

import { CharactersController } from '../controllers/characters.controller';
import { CharactersService } from '../services/characters.service';
import { charactersStub } from './stubs/characters.stub';

jest.mock('../services/characters.service');

describe('CharactersController', () => {
  let charactersController: CharactersController;
  let charactersService: CharactersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CharactersController],
      providers: [CharactersService],
    }).compile();

    charactersController = moduleRef.get<CharactersController>(CharactersController);
    charactersService = moduleRef.get<CharactersService>(CharactersService);
    jest.clearAllMocks();
  });

  it('should be return characters', async () => {
    const characters = await charactersController.getCharacter();
    expect(charactersService.getCharacter).toHaveBeenCalled();
    expect(characters).toEqual(charactersStub());
  });
});
