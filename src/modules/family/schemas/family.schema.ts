import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender } from '../../user/schemas/user';
import mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type FamilyDocument = mongoose.HydratedDocument<Family>;

@Schema({ })
export class Family {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  userId: User|null;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, type: String, enum: Gender })
  gender: string;

  @Prop({ required: false })
  thirdName: string;
}

export const FamilySchema = SchemaFactory.createForClass(Family);
/********************************************************
* This will provide id instead of _id, also remove __v  *
*********************************************************/
FamilySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_, obj) {  delete obj._id  },
});
