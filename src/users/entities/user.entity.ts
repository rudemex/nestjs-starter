import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    required: false,
    example: 1,
    description: 'Unique identifier of the user in the database.',
  })
  id?: number;

  @ApiProperty({
    example: 'Juan',
    description: 'The first name of the user.',
  })
  firstName: string;

  @ApiProperty({
    example: 'Perez',
    description: 'The last name of the user.',
  })
  lastName: string;

  @ApiProperty({
    example: 'juan.perez@mail.com',
    description: 'The email address of the user. It is unique and used for login.',
  })
  email: string;

  @ApiProperty({
    example: 'male',
    description:
      'The gender of the user. Possible values are "male", "female", or "x" for non-binary or unspecified.',
  })
  gender: string;

  @ApiProperty({
    example: 'semi-senior',
    description:
      'The seniority level of the user within the organization. Possible values are "trainee", "jr", "semi-senior", and "senior".',
  })
  seniority: string;

  @ApiProperty({
    required: false,
    example: '3 years of experience in software development',
    description:
      "A brief description of the user's professional experience. This field is optional and can be left blank.",
  })
  experience?: string;
}
