import { createContext, ReactElement, ReactNode } from "react";
import { DEFAULT_TOKENS, IOfficeScreenContext, ITokenObjectExtensions, ITokens } from "../utils";
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

    const context: IOfficeScreenContext = {
        tokens,
        setTokens,
        clearTokens,
        getForwardPage
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
        