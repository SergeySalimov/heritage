import { Family } from '../../core/interfaces/tree';
import { IUser } from '../../core/interfaces/user';

export class UserUtils {
  static provideFamilyToUser(user: IUser, family: Family): IUser {
    return {
      ...user,
      name: user.name ?? family.name,
      surname: user.surname ?? family.surname,
      gender: user.gender ?? family.gender,
    };
  }
}
