import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CharactersController } from '@characters/controllers/characters.controller';
import { CharactersService } from '@characters/services/characters.service';

@Module({
  imports: [HttpModule],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
