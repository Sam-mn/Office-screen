import { createContext, ReactElement, ReactNode } from "react";
import { DEFAULT_TOKENS, IOfficeScreenContext, ITokens } from "../utils";
import { useLocalStorage } from 'usehooks-ts';
import { jwtDecode } from "jwt-decode";

export const OfficeScreenContext = createContext<IOfficeScreenContext>({} as IOfficeScreenContext);

interface IContextProviderProps {
    children: ReactNode;
}

export function OfficeScreenContextProvider({ children }: IContextProviderProps) : ReactElement {
    const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens>("Tokens", DEFAULT_TOKENS);

    const forwardUser = () => {
        if (jwtDecode(tokens.accessToken).jti === "user") {
            console.log("user")
        }
        console.log("not user")
    }

    const context: IOfficeScreenContext = {
        tokens,
        setTokens,
        clearTokens,
        forwardUser
    };

    return (
        <OfficeScreenContext.Provider value={context}>{children}</OfficeScreenContext.Provider>
    );
}