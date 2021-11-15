import { IsOptional, IsPositive, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterCharacter {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: 'Number of page', required: false })
  page: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'filter by the given name', required: false })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'filter by the given status',
    required: false,
    enum: ['', 'alive', 'dead', 'unknown'],
  })
  status: 'alive' | 'dead' | 'unknown';

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'filter by the given species', required: false })
  species: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'filter by the given type', required: false })
  type: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'filter by the given gender',
    required: false,
    enum: ['', 'female', 'male', 'genderless', 'unknown'],
  })
  gender: 'female' | 'male' | 'genderless' | 'unknown';
}
