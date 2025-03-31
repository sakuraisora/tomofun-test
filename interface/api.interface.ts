export interface BreedListResponse {
  message: Record<string, string[]>;
  status: string;
}

export interface BreedImagesResponse {
  message: string[];
  status: string;
}

export interface Breed {
  name: string;
  subBreeds: string[];
}
