import { GenderEnum } from './user';

export interface Family {
  _id: string;
  userId: string | null;
  name: string;
  surname: string;
  gender: GenderEnum;
  thirdName?: string;
}
