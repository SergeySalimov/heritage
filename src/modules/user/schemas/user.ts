import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { IsEmail, IsString, Length } from 'class-validator';

export enum Gender {
  MAN = 'Man',
  WOMAN = 'Woman',
}

export class LoginUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'User email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Email invalid' })
  email: string;
  @ApiProperty({ example: '12345678', description: 'User password' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Min 4, max 16' })
  password: string;
}

export class UserDto extends LoginUserDto {
  @ApiProperty({ example: 'John', description: 'User name' })
  @IsString({ message: 'Must be a string' })
  name: string;
  @ApiProperty({ example: 'Smith', description: 'User surname' })
  @IsString({ message: 'Must be a string' })
  surname: string;
  @ApiProperty({ example: 'Man', description: 'User gender', enum: Gender })
  @Prop({ required: true, type: String, enum: Gender })
  gender: Gender;
}