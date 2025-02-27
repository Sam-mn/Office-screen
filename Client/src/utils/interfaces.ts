import { JwtPayload } from "jwt-decode";

export interface ITokens {
    accessToken: string;
    refreshToken: string;
    refreshTokenExpirationTime: Date
}

export interface IFetch<T> {
  succeeded: boolean;
  error?: string;
  value?: T;
}

export interface IUsers {
  id: string;
  name: string;
  UserStatus: string;
  startDate: string;
  endDate: string;
}

export interface IFetchedUser {
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
  clearTokens: () => void;
  getForwardPage: () => string;
  fetchDefaultStatuses: () => Promise<string[]>;
  sendStatusUpdate: (statusUpdate: IStatusUpdate) => void;
  fetchUsers: () => Promise<IFetchedUser[]>;
}

export interface ITokenObjectExtensions extends JwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

export interface IFolder {
  id: number;
  folderName: string;
}

export interface IDefaultStatuses {
  defaultStatus: string[];
}

export interface IFetchParams {
  url: RequestInfo | URL,
  options?: RequestInit
}

export interface ITokenRefresh {
  newTokens: ITokens,
  expired: boolean
}

export interface IStatusUpdate {
  Status: string,
  StartTime: string,
  EndTime: string
}