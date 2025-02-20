import { ITokens } from ".";

export const BASE_URL = "https://localhost:7078/api"; 

export const DEFAULT_TOKENS: ITokens = {
    accessToken: "",
    refreshToken: "",
    refreshTokenExpirationTime: new Date()
}

export const TOKEN_ROLE_IDENTIFIER: string = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export const FETCH_ERROR_ACCESS: string = "Unauthorized.";
export const FETCH_ERROR_DATA: string = "No data or unable to parse.";