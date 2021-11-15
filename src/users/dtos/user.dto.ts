import { IsEmail, IsString } from '@nestjs/class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

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

export class UpdateUserDto extends PartialType(CreateUserDto) {}
