"use client";

import { useEffect, useState } from "react";

import { Breed } from "@/interface/api.interface";
import { fetchAllBreeds } from "@/lib/api";
import { getSearchState, setSearchState } from "@/lib/search-state";

import BreedItem from "./breed-item";
import SearchBox from "./search-box";

export default function BreedList() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [filteredBreeds, setFilteredBreeds] = useState<Breed[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch breeds on component mount
  useEffect(() => {
    const loadBreeds = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = (await Promise.race([
          fetchAllBreeds(),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 10000),
          ),
        ])) as Breed[];

        // Restore previous search state
        const savedSearch = getSearchState();
        setSearchQuery(savedSearch);
        setBreeds(data);

        // Apply initial filtering
        if (savedSearch) {
          const filtered = data.filter((breed) =>
            breed.name.toLowerCase().includes(savedSearch.toLowerCase().trim()),
          );
          setFilteredBreeds(filtered);
        } else {
          setFilteredBreeds(data);
        }
      } catch (err) {
        console.error("Error fetching breeds:", err);
        setError("Failed to load dog breeds. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBreeds();
  }, []);

  // Update filtered breeds when search query changes
  useEffect(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();

    const filtered = normalizedQuery
      ? breeds.filter((breed) =>
          breed.name.toLowerCase().includes(normalizedQuery),
        )
      : breeds;

    setFilteredBreeds(filtered);
    setSearchState(searchQuery);
  }, [searchQuery, breeds]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-cream">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sakura"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md mx-auto mt-8">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-sakura text-white px-4 py-2 rounded-full hover:bg-sakura-dark transition-colors duration-300"
        >
          Retry with a Woof!
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Search */}
      <div className="bg-white rounded-lg shadow-sakura p-6 mb-6">
        <SearchBox
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />
      </div>
      {/* Results */}
      <div className="bg-white rounded-lg shadow-sakura overflow-hidden">
        {filteredBreeds.length > 0 ? (
          <div data-testid="breed-list">
            {filteredBreeds.map((breed, index) => (
              <BreedItem key={breed.name} breed={breed} index={index} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center" data-testid="empty-results">
            <p className="text-gray-500">
              No breeds found matching{" "}
              <span className="font-bold text-sakura-dark">
                &quot;{searchQuery}&quot;
              </span>
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
