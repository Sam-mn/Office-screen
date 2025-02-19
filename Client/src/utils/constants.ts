import { ITokens } from ".";

export const BASE_URL = "https://localhost:7078/api"; 

export const DEFAULT_TOKENS: ITokens = {
    accessToken: "",
    refreshToken: "",
    refreshTokenExpirationTime: new Date()
}