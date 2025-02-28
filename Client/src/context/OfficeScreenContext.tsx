import { createContext, ReactElement, ReactNode } from "react";
import { DEFAULT_TOKENS, IOfficeScreenContext, ITokens, returnRoleClaim } from "../utils";
import { useLocalStorage } from 'usehooks-ts';
// import { jwtDecode } from "jwt-decode";

export const OfficeScreenContext = createContext<IOfficeScreenContext>({} as IOfficeScreenContext);

interface IContextProviderProps {
    children: ReactNode;
}

export function OfficeScreenContextProvider({ children }: IContextProviderProps) : ReactElement {
    const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens>("Tokens", DEFAULT_TOKENS);

    const getForwardPage = (): string => {
        if (returnRoleClaim(tokens.accessToken) === "admin") {
            return "/admin";
        }
        return "/status";
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

        