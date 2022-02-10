import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    required: false,
    example: 1,
    description: 'User ID',
  })
  id?: number;

  @ApiProperty({
    example: 'Juan',
    description: 'The fist name of the User',
  })
  firstName: string;

  @ApiProperty({
    example: 'Perez',
    description: 'The lastname of the User',
  })
  lastName: string;

  @ApiProperty({
    example: 'jperez@email.com',
    description: 'The email of the user',
  })
  email: string;
}
