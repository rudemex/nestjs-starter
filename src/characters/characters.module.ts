import { Module } from '@nestjs/common';

import { HttpClientModule } from '@td-nest-capabilities/http-client';

import { CharactersController } from '@characters/controllers/characters.controller';
import { CharactersService } from '@characters/services/characters.service';

@Module({
  imports: [HttpClientModule],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
