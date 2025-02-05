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

export interface SearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sortField?: "breed" | "name" | "age";
  sortOrder?: SortOrder;
}

export type SortOrder = "asc" | "desc";
