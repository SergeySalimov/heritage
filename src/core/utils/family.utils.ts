import mongoose from 'mongoose';
import { UserDto } from '../../modules/user/schemas/user';
import { FamilyDto } from '../../modules/family/schemas/family';

export class FamilyUtils {
  static mapUserToFamily(user: UserDto, userId: mongoose.Schema.Types.ObjectId): FamilyDto {
    return {
      userId: userId ?? null,
      name: user.name,
      surname: user.surname,
      gender: user.gender,
      thirdName: null,
    };
  }
}
