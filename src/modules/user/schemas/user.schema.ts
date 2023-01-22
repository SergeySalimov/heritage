import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Sex } from './user';

export type UserDocument = HydratedDocument<User>;

@Schema({  })
export class User {
  @ApiProperty({ example: 'John', description: 'User name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'Smith', description: 'User surname' })
  @Prop({ required: true })
  surname: string;

  @ApiProperty({ example: 'user@email.com', description: 'User email' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ example: '12345678', description: 'User password' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'Man', description: 'User sex', enum: Sex })
  @Prop({ required: true, type: String, enum: Sex })
  sex: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
// Duplicate the ID field.
UserSchema.virtual('id').get(function userIdGetter() {
  return this._id.toHexString();
});
UserSchema.set('toJSON', { virtuals: true });