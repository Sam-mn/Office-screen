import { useContext } from "react";
import { BASE_URL, FETCH_ERROR_ACCESS, FETCH_ERROR_DATA, ITokens, IFolder } from ".";
import { OfficeScreenContext } from "../context/OfficeScreenContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const handlePublishImage = async (
  file: File | null,
  selectedDirectory: string,
  imageText: string
) => {
  if (!file) {
    alert("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("source", selectedDirectory);
  formData.append("text", imageText);
  console.log(imageText);
  console.log(selectedDirectory);
  try {
    const response = await axios.post(
      "https://localhost:7078/api/Image/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return response;
  } catch {
    alert("Error uploading file.");
  }
};

export const getFoldersReq = async (): Promise<IFolder[]> => {
  try {
    const response = await axios.get<IFolder[]>(`${BASE_URL}/folders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }
};

export const addFolderReq = async (
  folderName: string
): Promise<{ data: IFolder; status: number }> => {
  try {
    console.log(folderName);
    const response = await axios.post(
      `${BASE_URL}/folders`,
      { folderName },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error adding folder:", error);
    throw error;
  }
};

export async function login(username: string, password: string): Promise<ITokens> {
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

export async function authTest(): Promise<void> {
  const url = `${BASE_URL}/auth/test-authorization`;

  const response: IFetch<string> = await fetchWithToken<string>(url, {
    method: "GET"
  });

  if (response.succeeded === false && response.error !== FETCH_ERROR_DATA) {
    throw new Error("User not authenticated or authorized.");
  }
  else {
    console.log("User authenticated.")
  }
}

/// Fetch functions ///

interface IFetch<T> {
  succeeded: boolean;
  error?: string;
  value?: T;
}

export async function fetchWithToken<T>(
  url: RequestInfo | URL,
  options?: RequestInit
): Promise<IFetch<T>> {
  
  const context = useContext(OfficeScreenContext);
  const tokens = context.tokens;
  const setTokens = context.setTokens;

  // Check and refresh token
  const tokenIsExpired: boolean = checkTokenExpiration(tokens!.accessToken);
  if (tokenIsExpired) {
      const refreshedTokens = await refreshTokens(tokens!);
      setTokens(refreshedTokens);
  }

  // Perform fetch
  const requestInit: RequestInit = createRequestInit(
    tokens.accessToken,
    options
  );

  // Fetch data
  const response: Response = await fetch(url, requestInit);

  // Return data
  if (response.ok === true) {
    let jsonValue: any;
    let returnValue: T;
    try {
      jsonValue = await response.json();
      returnValue = jsonValue as T;
      return {
        succeeded: true,
        value: returnValue
      };
    } catch {
      return {
        succeeded: false,
        error: FETCH_ERROR_DATA
      };
    }
  }

  return {
    succeeded: false,
    error: FETCH_ERROR_ACCESS
  };
}

export async function refreshTokens({
  accessToken,
  refreshToken,
}: ITokens): Promise<ITokens> {
  console.log("Refreshing token.")

  const url: string = `${BASE_URL}/api/auth/refresh`;

  const response: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken,
      refreshToken,
    }),
  });

  if (response.ok === false) {
    useContext(OfficeScreenContext).clearTokens();
    const navigate = useNavigate();
    navigate("/login");
  }

  return (await response.json()) as ITokens;
}

/// Helper functions ///

const checkTokenExpiration = (token: string): boolean => {
  if (!token) return true;

  const decoded = jwtDecode(token);
  const expire = decoded.exp! * 1000; // * 1000 to get time in milliseconds.
  const currentTimestamp = Date.now();

  return expire < currentTimestamp;
}

const createRequestInit = (accessToken: string, options?: RequestInit): RequestInit => {
  const requestObject: RequestInit = { ...options };

  if (accessToken) {
    requestObject.headers = { ...options?.headers, Authorization: `Bearer ${accessToken}` };
  }

  return requestObject;
}