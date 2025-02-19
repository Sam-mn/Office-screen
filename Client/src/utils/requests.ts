
import { BASE_URL, ITokens } from ".";
async function login(username: string, password: string): Promise<ITokens> {
    const url = `${BASE_URL}/auth/login`;
  
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok === false) {
      throw new Error("Could not log in. Response status: " + response.status);
    }
  
    return (await response.json()) as ITokens;
  }

export default login;