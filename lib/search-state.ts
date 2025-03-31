"use client";

/**
 * Search state is stored in session storage to persist the search across page reloads.
 * @returns String
 */
export const getSearchState = (): string => {
  if (typeof window === "undefined") return "";

  return sessionStorage.getItem("breedSearch") || "";
};

/**
 * Sets the search state in session storage.
 * @param query - The search query to set in session storage.
 */
export const setSearchState = (query: string): void => {
  if (typeof window === "undefined") return;

  if (query) {
    sessionStorage.setItem("breedSearch", query);
  } else {
    sessionStorage.removeItem("breedSearch");
  }
};
