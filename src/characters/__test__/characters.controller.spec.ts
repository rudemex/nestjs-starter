import { Test, TestingModule } from '@nestjs/testing';

import { CharactersController } from '../controllers/characters.controller';
import { CharactersService } from '../services/characters.service';
import { charactersStub } from './stubs/characters.stub';

jest.mock('../services/characters.service');

describe('CharactersController', () => {
  let controller: CharactersController;
  let service: CharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CharactersController],
      providers: [CharactersService],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
    service = module.get<CharactersService>(CharactersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return characters', async () => {
    const characters = await controller.getCharacter();
    expect(service.getCharacter).toHaveBeenCalled();
    expect(characters).toEqual(charactersStub());
  });

  /*it('should be return error', async () => {
    jest.spyOn(service, 'getCharacter').mockImplementationOnce(
      jest.fn().mockResolvedValue({
        error: 'Character not found',
      }),
    );
    const characters = await controller.getCharacter();
    expect(service.getCharacter).toHaveBeenCalled();
    expect(characters).toEqual({
      error: 'Character not found',
    });
  });*/
});
