import { Gender } from '../../user/schemas/user';
import mongoose from 'mongoose';

export class FamilyDto {
  userId: mongoose.Schema.Types.ObjectId | null;
  name: string;
  surname: string;
  gender: Gender;
  thirdName?: string;
}