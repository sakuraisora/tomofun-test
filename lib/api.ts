import {
  Breed,
  BreedImagesResponse,
  BreedListResponse,
} from "@/interface/api.interface";

/**
 * Fetch https://dog.ceo/api/breeds/list/all
 * @returns Breed[]
 */
export const fetchAllBreeds = async (): Promise<Breed[]> => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data: BreedListResponse = await response.json();
    return Object.entries(data.message).map(([name, subBreeds]) => ({
      name,
      subBreeds,
    }));
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
    return [];
  }
};

/**
 * Fetch https://dog.ceo/api/breed/{breed}/images/random/{count}
 * @param breed
 * @param count
 * @returns Image URL
 */
export const fetchBreedImages = async (
  breed: string,
  count: number = 50,
): Promise<string[]> => {
  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random/${count}`,
    );
    const data: BreedImagesResponse = await response.json();
    return data.message;
  } catch (error) {
    console.error(`Error fetching images for breed ${breed}:`, error);
    return [];
  }
};
