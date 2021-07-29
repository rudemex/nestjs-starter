import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CharactersController } from './controllers/characters.controller';
import { CharactersService } from './services/characters.service';

@Module({
  imports: [HttpModule],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
