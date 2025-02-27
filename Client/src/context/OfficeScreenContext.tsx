import { createContext, ReactElement, ReactNode, useState } from "react";
import { BASE_URL, DEFAULT_TOKENS, fetchWithToken, IDefaultStatuses, IFetch, IFetchParams, IOfficeScreenContext, ITokenObjectExtensions, ITokens, refreshTokens } from "../utils";
import { useLocalStorage } from 'usehooks-ts';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const OfficeScreenContext = createContext<IOfficeScreenContext>({} as IOfficeScreenContext);

interface IContextProviderProps {
    children: ReactNode;
}

export function OfficeScreenContextProvider({ children }: IContextProviderProps) : ReactElement {
    const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens>("Tokens", DEFAULT_TOKENS);
    const [checkingTokens, setCheckingToken] = useState<boolean>(false);

    class fetchClass {
        loading: boolean = false;
        fetchFunc<T>(params: IFetchParams): Promise<IFetch<T>> {
         while (this.loading) {}
         this.loading = true;
         let tokenCheckComplete = false;
         checkTokens().then(() => tokenCheckComplete = true);
         while (!tokenCheckComplete) {}
         let fetchComplete = false;
         const data = fetchWithToken<T>(params, tokens.accessToken);
         data.then(() => fetchComplete = true);
         while (!fetchComplete) {}
         this.loading = false;
         return data;
        } 
     }

    const fetchC = new fetchClass();

    const getForwardPage = (): string => {
        if (getRole(tokens.accessToken) === "admin") {
            return "/admin";
        }
        return "/addstatus";
    }
    
    async function fetchWithContext<T>(params: IFetchParams): Promise<IFetch<T>> {
        console.log("Attempting fetch... Checking token... " + checkingTokens);
        while (checkingTokens) {console.log("Waiting")}
        await checkTokens();
        console.log("Token check complete, fetching.");
        const data = await fetchWithToken<T>(params, tokens.accessToken);
        console.log("Fetch complete.")
        return data;
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

    const checkTokens = async(): Promise<boolean> => {
        setCheckingToken(true);
        console.log("Checking tokens set " + checkingTokens);
        // Check and refresh token
        const tokenIsExpired: boolean = checkTokenExpiration(tokens!.accessToken);
        if (tokenIsExpired) {
            console.log("Refreshing token, old refreshToken: " + tokens.refreshToken);
            const refreshedTokens = await refreshTokens(tokens!);
            if (refreshedTokens.expired) {
                clearTokens();
                const navigate = useNavigate();
                navigate("/login");
                setCheckingToken(true);
                return false;
            }
            else {
                setTokens(refreshedTokens.newTokens);
                console.log("Refreshing token, new refreshtoken: " + refreshedTokens.newTokens.refreshToken);
            }
        }
        setCheckingToken(false);
        return true;
    }

    

    const context: IOfficeScreenContext = {
        tokens,
        setTokens,
        clearTokens,
        getForwardPage,
        fetchDefaultStatuses
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