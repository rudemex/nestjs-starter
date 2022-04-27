import { IsOptional, IsPositive, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Escape } from 'class-sanitizer';

export class FilterCharacter {
  @IsOptional()
  @IsPositive()
  @Escape()
  @ApiProperty({ description: 'Number of page', required: false })
  page: number;

  @IsOptional()
  @IsString()
  @Escape()
  @ApiProperty({ description: 'filter by the given name', required: false })
  name: string;

  @IsOptional()
  @IsString()
  @Escape()
  @ApiProperty({
    description: 'filter by the given status',
    required: false,
    enum: ['', 'alive', 'dead', 'unknown'],
  })
  status: 'alive' | 'dead' | 'unknown';

  @IsOptional()
  @IsString()
  @Escape()
  @ApiProperty({ description: 'filter by the given species', required: false })
  species: string;

  @IsOptional()
  @IsString()
  @Escape()
  @ApiProperty({ description: 'filter by the given type', required: false })
  type: string;

  @IsOptional()
  @IsString()
  @Escape()
  @ApiProperty({
    description: 'filter by the given gender',
    required: false,
    enum: ['', 'female', 'male', 'genderless', 'unknown'],
  })
  gender: 'female' | 'male' | 'genderless' | 'unknown';
}
