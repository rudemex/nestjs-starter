import { Test } from '@nestjs/testing';

import { AppModule } from '../app.module.js';
import { AppService } from '../app.service.js';
import { CharactersModule } from '../characters/characters.module.js';
import { CharactersService } from '../characters/services/characters.service.js';
import { UsersModule } from '../users/users.module.js';
import { UsersService } from '../users/services/users.service.js';

describe('Modules', () => {
  it('should compile the AppModule with every feature module', async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();

    expect(moduleRef.get(AppService)).toBeInstanceOf(AppService);
    expect(moduleRef.get(CharactersService)).toBeInstanceOf(CharactersService);
    expect(moduleRef.get(UsersService)).toBeInstanceOf(UsersService);
    expect(moduleRef.get(CharactersModule)).toBeDefined();
    expect(moduleRef.get(UsersModule)).toBeDefined();

    await moduleRef.close();
  });
});
