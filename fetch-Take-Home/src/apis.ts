import { Dog, SearchParams, SearchResponse, User } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (name: string, email: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email } as User),
    });

    return response.ok;
  } catch (error) {
    console.error("Login Error:", error);
    return false;
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    return response.ok;
  } catch (error) {
    console.error("Logout Error:", error);
    return false;
  }
};

export const fetchDogBreeds = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Failed to fetch breeds");
  return response.json();
};

export const fetchDogDetails = async (dogIds: string[]): Promise<Dog[]> => {
  const response = await fetch(`${API_BASE_URL}/dogs`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dogIds),
  });

  if (!response.ok) throw new Error("Failed to fetch dog details");
  return response.json();
};

export const matchFavoriteDog = async (
  dogIds: string[]
): Promise<{ match: string }> => {
  const response = await fetch(`${API_BASE_URL}/dogs/match`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dogIds),
  });

  if (!response.ok) throw new Error("Failed to match favorite dogs");
  return response.json();
};

export const searchDogs = async (
  params: SearchParams
): Promise<SearchResponse> => {
  const queryParams = new URLSearchParams();

  if (params.breeds && params.breeds.length > 0) {
    params.breeds.forEach((breed) => queryParams.append("breeds", breed));
  }
  if (params.zipCodes && params.zipCodes.length > 0) {
    params.zipCodes.forEach((zip) => queryParams.append("zipCodes", zip));
  }
  if (params.ageMin !== undefined)
    queryParams.append("ageMin", params.ageMin.toString());
  if (params.ageMax !== undefined)
    queryParams.append("ageMax", params.ageMax.toString());
  queryParams.append("size", (params.size ?? 25).toString());
  if (params.from !== undefined)
    queryParams.append("from", params.from.toString());

  // Apply sorting (default to breed:asc)
  const sortField = params.sortField ?? "breed";
  const sortOrder = params.sortOrder ?? "asc";
  queryParams.append("sort", `${sortField}:${sortOrder}`);

  const response = await fetch(
    `${API_BASE_URL}/dogs/search?${queryParams.toString()}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) throw new Error("Failed to search dogs");
  return response.json();
};
