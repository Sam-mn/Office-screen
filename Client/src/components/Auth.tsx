import { ReactElement, useEffect, useState } from "react";
import { returnRoleClaim ,checkTokenExpiration, refreshTokens ,useOfficeContext } from "../utils";
import { useNavigate } from "react-router-dom";

interface IRequireAuthProps {
  children: ReactElement;
}

export function Auth({ children }: IRequireAuthProps): ReactElement {
  const { tokens, setTokens, clearTokens } = useOfficeContext();
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
  
    const checkAndRefresh = async () => {
      if (!tokens?.accessToken) {
        navigate("/403");
        return;
      }
        
      let refreshedTokens = tokens;
  
      // Check and refresh token
      const tokenIsExpired: boolean = checkTokenExpiration(tokens!.accessToken);
        
      if (tokenIsExpired) {
        try {
          refreshedTokens = await refreshTokens(tokens, clearTokens, navigate!);
          setTokens(refreshedTokens);

          console.log("refreshed tokens", tokens);

        } catch (error) {
          console.error("Token failed to refresh", error);
          navigate("/403");
          return;
        }
      }
  
      const returnedRole = returnRoleClaim(refreshedTokens.accessToken);
      setRole(returnedRole);
   
      
    };
     
    checkAndRefresh();

  }, [ navigate, tokens, setTokens ]);
  

  useEffect(() => {
    if (role && role !== "admin" && role !== "user") {
      navigate("/403");
    }
  }, [role, navigate]);
  
  
  return children;
};

  

