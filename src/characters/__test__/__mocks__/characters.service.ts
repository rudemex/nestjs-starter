import { charactersStub } from '../stubs/characters.stub';

export const CharactersService = jest.fn().mockReturnValue({
  getCharacter: jest.fn().mockResolvedValue(charactersStub()),
  getCharacters: jest.fn().mockResolvedValue([charactersStub()]),
});
