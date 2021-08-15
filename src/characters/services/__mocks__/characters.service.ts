import { charactersStub } from '../../__test__/stubs/characters.stub';

export const CharactersService = jest.fn().mockReturnValue({
  getCharacter: jest.fn().mockResolvedValue(charactersStub()),
});
