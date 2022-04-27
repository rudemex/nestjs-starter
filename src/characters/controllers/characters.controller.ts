import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { sanitize } from 'class-sanitizer';

import { FilterCharacter } from '../dtos/character.dto';
import { CharactersService } from '../services/characters.service';

@ApiTags('Characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly characterService: CharactersService) {}

  @Get()
  @ApiOperation({ summary: 'Get character' })
  async getCharacter(@Query() params?: FilterCharacter) {
    return sanitize(this.characterService.getCharacter(params));
  }
}
