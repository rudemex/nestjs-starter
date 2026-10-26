import { Module } from '@nestjs/common';

import { CharactersController } from './controllers/characters.controller.js';
import { CharactersService } from './services/characters.service.js';

@Module({
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
