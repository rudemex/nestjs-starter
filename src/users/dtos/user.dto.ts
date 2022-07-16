import { IsEmail, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'Juan',
    description: 'The fist name of the User',
  })
  readonly firstName: string;

  @IsString()
  @ApiProperty({
    example: 'Perez',
    description: 'The lastname of the User',
  })
  readonly lastName: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'jperez@email.com',
    description: 'The email of the user',
  })
  readonly email: string;
}

export class UpdateUserDto {
  @IsString()
  @ApiProperty({
    example: 'Juan',
    description: 'The fist name of the User',
  })
  @IsOptional()
  readonly firstName: string;

  @IsString()
  @ApiProperty({
    example: 'Perez',
    description: 'The lastname of the User',
  })
  @IsOptional()
  readonly lastName: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'jperez@email.com',
    description: 'The email of the user',
  })
  @IsOptional()
  readonly email: string;
}
