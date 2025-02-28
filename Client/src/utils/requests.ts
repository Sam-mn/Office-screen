import {
  BASE_URL,
  FETCH_ERROR_ACCESS,
  FETCH_ERROR_DATA,
  ITokens,
  IFolder,
  IImportantNote,
  IFetch,
  IFetchParams,
  ITokenRefresh,
  DEFAULT_TOKENS,
  UserRegistrationData,
  IComic,
} from ".";
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
      "https://localhost:7078/api/image/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
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

export async function login(
  username: string,
  password: string
): Promise<ITokens> {
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

export async function fetchWithToken<T>(
  params: IFetchParams,
  accessToken: string
): Promise<IFetch<T>> {
  // Create request
  const requestInit: RequestInit = createRequestInit(
    accessToken,
    params.options
  );

  console.log("Debugging: " + requestInit.method);
  console.log("Debugging: " + requestInit.body);

  // Fetch data
  const response: Response = await fetch(params.url, requestInit);
  // Check and return data
  if (response.ok === true) {
    try {
      const value = (await response.json()) as T;
      return {
        succeeded: true,
        value: value,
      };
    } catch {
      return {
        succeeded: false,
        error: FETCH_ERROR_DATA,
      };
    }
  }
  return {
    succeeded: false,
    error: FETCH_ERROR_ACCESS,
  };
}

export async function refreshTokens({
  accessToken,
  refreshToken,
}: ITokens): Promise<ITokenRefresh> {
  const url: string = `${BASE_URL}/auth/refresh`;

  const response: Response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken,
      refreshToken,
    }),
  });

  if (!response.ok) {
    return {
      newTokens: DEFAULT_TOKENS,
      expired: true,
    };
  }

  const tokens = (await response.json()) as ITokens;
  return {
    newTokens: tokens,
    expired: false,
  };
}

/// Helper functions ///

const createRequestInit = (
  accessToken: string,
  options?: RequestInit
): RequestInit => {
  const requestObject: RequestInit = { ...options };
  if (accessToken) {
    requestObject.headers = {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return requestObject;
};

export const getComicReq = async (): Promise<IComic> => {
  try {
    const response = await axios.get<IComic>(`${BASE_URL}/webcomics/latest`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }
};

export const getRandomComicReq = async (): Promise<IComic> => {
  try {
    const response = await axios.get<IComic>(`${BASE_URL}/webcomics/random`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }
};

export const handlePublishImageFromUrl = async (
  imageUrl: string,
  text: string
) => {
  try {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("imageUrl", imageUrl || "");

    const response = await axios.post(
      "https://localhost:7078/api/image/download",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch {
    throw new Error("Login failed.");
  }
};

export const addNoteReq = async (
  note: string
): Promise<{ data: IImportantNote; status: number }> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/importantNotes`,
      { note },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

export const EditNoteReq = async (
  id: number,
  importantNote: IImportantNote
): Promise<{ data: IImportantNote; status: number }> => {
  try {
    const response = await axios.put(
      `${BASE_URL}/importantNotes/${id}`,
      importantNote,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

export const getImportantNotReq = async (
  id: number
): Promise<IImportantNote> => {
  try {
    const response = await axios.get<IImportantNote>(
      `${BASE_URL}/importantNotes/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching note:", error);
    throw error;
  }
};

export const deleteImportantNote = async (
  id: number
): Promise<{ data: IImportantNote; status: number }> => {
  try {
    const response = await axios.delete(`${BASE_URL}/importantNotes/${id}`);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

export const addNewUser = async (userData: UserRegistrationData) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return { data: response };
};

export const getImportantNotesReq = async (): Promise<IImportantNote[]> => {
  try {
    const response = await axios.get<IImportantNote[]>(
      `${BASE_URL}/importantNotes`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching important notes:", error);
    throw error;
  }
};
