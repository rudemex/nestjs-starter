import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CharactersService } from '../services/characters.service';

@ApiTags('character')
@Controller('characters')
export class CharactersController {
  constructor(private characterService: CharactersService) {}

  @Get()
  @ApiOperation({ summary: 'List of character' })
  async getAllCharacter() {
    return await this.characterService.getAllCharacter();
  }
}
