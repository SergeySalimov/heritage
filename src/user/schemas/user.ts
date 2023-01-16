import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'John', description: 'User name' })
  name: string;
  @ApiProperty({ example: 'Smith', description: 'User surname' })
  surname: string;
  @ApiProperty({ example: 'user@email.com', description: 'User email' })
  email: string;
  @ApiProperty({ example: '12345678', description: 'User password' })
  password: string;
  id?: string;
}
