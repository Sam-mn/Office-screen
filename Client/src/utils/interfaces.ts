export interface ITokens {
    accessToken: string;
    refreshToken: string;
    refreshTokenExpirationTime: Date
}

export interface IUsers {
  id: string;
  name: string;
  UserStatus: string;
  startDate: string;
  endDate: string;
}

export interface IImportantNote {
  id: string;
  note: string;
}

export interface IComic {
  id: number;
  filePath: string | null;
  url: string | null;
  text: string;
}

export interface UserLoginData {
  username: string;
  password: string;
}

export interface UserRegistrationData {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}

export interface IOfficeScreenContext {
  tokens: ITokens;
  setTokens: (tokens: ITokens) => void;
}