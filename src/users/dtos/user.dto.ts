import { IsEmail, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'Juan',
    description: 'The first name of the user.',
  })
  readonly firstName: string;

  @IsString()
  @ApiProperty({
    example: 'Perez',
    description: 'The last name of the user.',
  })
  readonly lastName: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'juan.perez@mail.com',
    description: 'The email address of the user. It is unique and used for login.',
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    example: 'male',
    description:
      'The gender of the user. Possible values are "male", "female", or "x" for non-binary or unspecified.',
  })
  readonly gender: string;

  @IsString()
  @ApiProperty({
    example: 'semi-senior',
    description:
      'The seniority level of the user within the organization. Possible values are "trainee", "jr", "semi-senior", and "senior".',
  })
  readonly seniority: string;

  @IsString()
  @ApiProperty({
    required: false,
    example: '',
    description:
      "A brief description of the user's professional experience. This field is optional and can be left blank.",
  })
  readonly experience: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Juan',
    description: 'The first name of the user.',
  })
  readonly firstName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Perez',
    description: 'The last name of the user.',
  })
  readonly lastName?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    example: 'juan.perez@mail.com',
    description: 'The email address of the user. It is unique and used for login.',
  })
  readonly email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'male',
    description:
      'The gender of the user. Possible values are "male", "female", or "x" for non-binary or unspecified.',
  })
  readonly gender?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'semi-senior',
    description:
      'The seniority level of the user within the organization. Possible values are "trainee", "jr", "semi-senior", and "senior".',
  })
  readonly seniority?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: '',
    description:
      "A brief description of the user's professional experience. This field is optional and can be left blank.",
  })
  readonly experience?: string;
}
