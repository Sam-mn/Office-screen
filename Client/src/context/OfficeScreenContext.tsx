import { createContext, ReactElement, ReactNode, useState } from "react";
import { BASE_URL, DEFAULT_TOKENS, fetchWithToken, IDefaultStatuses, IFetch, IFetchParams, IOfficeScreenContext, IStatusUpdate, ITokenObjectExtensions, ITokens, refreshTokens } from "../utils";
import { useLocalStorage } from 'usehooks-ts';
import { jwtDecode } from "jwt-decode";

export const OfficeScreenContext = createContext<IOfficeScreenContext>({} as IOfficeScreenContext);

interface IContextProviderProps {
    children: ReactNode;
}

export function OfficeScreenContextProvider({ children }: IContextProviderProps) : ReactElement {
    const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens>("Tokens", DEFAULT_TOKENS);

    const getForwardPage = (): string => {
        if (getRole(tokens.accessToken) === "admin") {
            return "/admin";
        }
        return "/addstatus";
    }
    
    async function fetchWithContext<T>(params: IFetchParams): Promise<IFetch<T>> {
        await checkTokens();
        return await fetchWithToken<T>(params, tokens.accessToken);
    }

    const checkTokens = async(): Promise<boolean> => {
        const tokenIsExpired: boolean = checkTokenExpiration(tokens!.accessToken);
        if (tokenIsExpired) {
            console.log("Refreshing token, old refreshToken: " + tokens.refreshToken);
            const refreshedTokens = await refreshTokens(tokens!);
            if (refreshedTokens.expired) {
                clearTokens();
                return false;
            }
            else {
                setTokens(refreshedTokens.newTokens);
                console.log("Refreshing token, new refreshtoken: " + refreshedTokens.newTokens.refreshToken);
            }
        }
        return true;
    }

    async function fetchDefaultStatuses(): Promise<string[]> {
      const params: IFetchParams = {
        url: `${BASE_URL}/status/default`,
        options: {method: "Get"}
      }
      const response: IFetch<IDefaultStatuses> = await fetchWithContext<IDefaultStatuses>(params);
      if (response.succeeded === false) {
        throw new Error("Fetching default statuses failed.");
      }
      return response.value!.defaultStatus;
    }

    function sendStatusUpdate(statusUpdate: IStatusUpdate): void {
        const params: IFetchParams = {
            url: `${BASE_URL}/status/set?newStatus=` + status,
            options: {method: "Post"}
        }
        fetchWithContext(params);
    }

    const context: IOfficeScreenContext = {
        tokens,
        setTokens,
        clearTokens,
        getForwardPage,
        fetchDefaultStatuses,
        sendStatusUpdate
    };

    return (
        <OfficeScreenContext.Provider value={context}>{children}</OfficeScreenContext.Provider>
    );
}

const getRole = (accessToken: string): string => {
    const decodedToken = jwtDecode<ITokenObjectExtensions>(accessToken);
    const role = decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ]!.toLowerCase();
    return role;
}
        
const checkTokenExpiration = (token: string): boolean => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const expire = decoded.exp! * 1000; // * 1000 to get time in milliseconds.
    const currentTimestamp = Date.now();
    return expire < currentTimestamp;
  }