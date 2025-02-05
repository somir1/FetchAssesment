export interface User {
  name: string;
  email: string;
}

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface SearchResponse {
  resultIds: string[];
  total: number;
}

export type SortOrder = "asc" | "desc";
