import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class TokenDto {
  @ApiProperty({ example: 'Bearer 123456', description: 'Token' })
  token: string;
  @ApiProperty({ example: '64a0459107ff4a82386d911f', description: 'user id' })
  id: ObjectId;
}
