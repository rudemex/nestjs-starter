import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { FilterCharacter } from '../dtos/character.dto';
import { CharactersService } from '../services/characters.service';

@ApiTags('Characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly characterService: CharactersService) {}

  @Get()
  @ApiOperation({ summary: 'Get character' })
  async getCharacter(@Query() params?: FilterCharacter) {
    return this.characterService.getCharacter(params);
  }
}
