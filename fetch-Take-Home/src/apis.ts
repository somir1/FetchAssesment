import { Dog, SearchResponse, User } from "./types";

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

export const searchDogs = async (
  params: Record<string, any>
): Promise<SearchResponse> => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/dogs/search?${query}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Failed to search dogs");
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
