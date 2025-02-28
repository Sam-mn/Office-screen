import { ReactElement, useEffect, useState } from "react";
import { returnRoleClaim ,checkTokenExpiration, refreshTokens ,useOfficeContext } from "../utils";
import { useNavigate } from "react-router-dom";

interface IRequireAuthProps {
  children: ReactElement;
}

export function ResourceAuth({ children }: IRequireAuthProps): ReactElement {
  const { tokens, setTokens, clearTokens } = useOfficeContext();
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
  
    const checkAndRefresh = async () => {
      if (!tokens?.accessToken) {
        navigate("/403");
        return;
      }
         
      // let refreshedTokens = tokens;
      
      // Check and refresh token
      const tokenIsExpired: boolean = checkTokenExpiration(tokens!.accessToken);
        
      if (!tokenIsExpired) {
        return;
      }
      try {
        const refreshedTokens = await refreshTokens(tokens, clearTokens, navigate);

        if (JSON.stringify(tokens) !== JSON.stringify(refreshedTokens.refreshToken)) {
          setTokens(refreshedTokens);

          console.log("refreshed tokens", tokens);

        }
        console.log("saved refresh token:", refreshedTokens.refreshToken);
        
      } catch (error) {
        console.error("Token failed to refresh", error);
        navigate("/403");
        return;
      }
    };
      
      const returnedRole = returnRoleClaim(tokens.accessToken);
      setRole(returnedRole);
   
        
    checkAndRefresh();
    
  }, [ tokens.accessToken ]);
  


  useEffect(() => {
    if (role && role !== "admin") {
      navigate("/403");
    }
  }, [role]);
  
 
  return children;
};

  

