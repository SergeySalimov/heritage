export enum GenderEnum {
  MAN = 'Man',
  WOMAN = 'Woman',
}

export interface IUser {
  name: string | null;
  surname: string | null;
  email: string | null;
  gender: GenderEnum | null;
  id?: string | null;
}

export interface TokenInfo {

}

