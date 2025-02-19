import { createContext, ReactElement, ReactNode } from "react";
import { DEFAULT_TOKENS, IOfficeScreenContext, ITokens } from "../utils";
import { useLocalStorage } from 'usehooks-ts';

export const OfficeScreenContext = createContext<IOfficeScreenContext>({} as IOfficeScreenContext);

interface IContextProviderProps {
    children: ReactNode;
}

export function OfficeScreenContextProvider({ children }: IContextProviderProps) : ReactElement {
    const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens>("Tokens", DEFAULT_TOKENS);

    const context: IOfficeScreenContext = {tokens, setTokens};

    return (
        <OfficeScreenContext.Provider value={context}>{children}</OfficeScreenContext.Provider>
    );
}