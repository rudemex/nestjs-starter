import { IsEnum, IsOptional, IsPositive, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum CharacterStatus {
  Alive = 'alive',
  Dead = 'dead',
  Unknown = 'unknown',
}

export enum CharacterGender {
  Female = 'female',
  Male = 'male',
  Genderless = 'genderless',
  Unknown = 'unknown',
}

export class FilterCharacter {
  @IsOptional()
  @IsPositive()
  @ApiProperty({
    description: 'Number of page',
    required: false,
    example: 1,
    default: 1,
  })
  page?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Filter by the given name.',
    required: false,
    example: 'rick',
    default: '',
  })
  name?: string;

  @IsOptional()
  @IsEnum(CharacterStatus, {
    message: 'Status must be one of: alive, dead, unknown',
  })
  @ApiProperty({
    description: 'Filter by the given status.',
    required: false,
    enum: CharacterStatus,
    example: CharacterStatus.Alive,
    default: CharacterStatus.Alive,
  })
  status?: CharacterStatus;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Filter by the given species.',
    required: false,
    example: 'Human',
    default: '',
  })
  species?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Filter by the given type.',
    required: false,
    example: '',
    default: '',
  })
  type?: string;

  @IsOptional()
  @IsEnum(CharacterGender, {
    message: 'Gender must be one of: female, male, genderless, unknown',
  })
  @ApiProperty({
    description: 'Filter by the given gender.',
    required: false,
    enum: CharacterGender,
    example: CharacterGender.Male,
    default: CharacterGender.Unknown,
  })
  gender?: CharacterGender;
}
