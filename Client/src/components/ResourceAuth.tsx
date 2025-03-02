import { ReactElement, useEffect, useState } from "react";
import { useOfficeContext } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";

interface IRequireAuthProps {
  children: ReactElement;
}

export function ResourceAuth({ children }: IRequireAuthProps): ReactElement | null {
  const { checkTokens, getRole,tokens} = useOfficeContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole ] = useState<string>("");
  const [authToken, setAuthToken] = useState<boolean | null>(null);
  


  const allUserAllowedPaths = ["/status"];
  
  
  useEffect(() => {
    // console.log("Entering useEffect should be routing to Log-in page")
       
    const checkAuth = async () => {
          
      const isAuthenticated = await checkTokens();
      
      // console.log("Has the token been refreshed: ", isAuthenticated);
      setAuthToken(isAuthenticated);

      if (!isAuthenticated) {
        // console.log("Redirecting to Log-in page");
        navigate("/login", { replace: true });
      }
    };

    checkAuth();
  }, [ navigate ]);

  useEffect(() => {
    if (authToken) {
      const returnedRole = getRole(tokens.accessToken);
      setRole(returnedRole);
      // console.log("User role set to:", returnedRole);
        
      }
    
  }, [authToken, tokens.accessToken]);
  
  
  useEffect(() => {
    if (role) {
      const isAllowedPath = allUserAllowedPaths.includes(location.pathname);
      if (role !== "admin" && !isAllowedPath) {
        navigate("/403");
        
      }
    }
  }, [ role, location.pathname]);
  
  if (!authToken || role === null) return null;

  return children;
};

  
  
 

  

