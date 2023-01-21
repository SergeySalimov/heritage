import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({ example: 'Bearer 123456', description: 'Token' })
  token: string;
}
