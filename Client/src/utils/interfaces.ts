import { JwtPayload } from "jwt-decode";


export interface ITokens {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpirationTime: Date;
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
  status: string;
  statusStartTime: string;
  statusEndTime: string;
}

export interface IImportantNote {
  id?: number;
  note: string;
}

export interface IComic {
  id: number;
  filePath: string | null;
  url: string | null;
  text: string;
  imageName: string;
  source: string;
}

export interface IComicLocalStorage {
  id?: number;
  url: string | null;
  text?: string;
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
  admin: boolean;
}

export interface IOfficeScreenContext {
  checkTokens (): Promise<boolean>;
  clearTokens: () => void;
  fetchDefaultStatuses: () => Promise<string[]>;
  fetchUsers: () => Promise<IFetchedUser[]>;
  getForwardPage: () => string;
  getRole: (accessToken: string) => string;
  tokens: ITokens;
  sendStatusUpdate: (statusUpdate: IStatusUpdate) => void;
  setTokens: (tokens: ITokens) => void;
}

export interface ITokenObjectExtensions extends JwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  [ key: string ]: unknown;
 
}

export interface IFolder {
  id: number;
  folderName: string;
}

export interface IDefaultStatuses {
  defaultStatus: string[];
}

export interface IFetchParams {
  url: RequestInfo | URL;
  options?: RequestInit;
}

export interface ITokenRefresh {
  newTokens: ITokens;
  expired: boolean;
}

export interface IStatusUpdate {
  Status: string;
  StartTime: string;
  EndTime: string;
}

export interface MenuItem {
  description: string;
  name: string;
  price: string;
  tags: string[];
}

export interface DailyMenuResponse {
  dayMenu: string;
  day: string;
}

export interface DailyMenu {
  dayMenu: MenuItem[];
  day: string;
}

export interface IAllComic {
  id: number;
  title: string;
  imageUrl: string;
}

export interface IAllComicPagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
