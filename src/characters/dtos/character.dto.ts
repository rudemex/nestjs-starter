import { IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterCharacter {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: 'Number of page', required: false })
  page: number;
}
