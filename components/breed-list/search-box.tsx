import { memo, useEffect, useRef, useState } from "react";

interface SearchBoxProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  onClear: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  debounceTime?: number;
}

function SearchBox({
  searchQuery,
  onSearch,
  onClear,
  placeholder = "Search for a pawsome breed...",
  autoFocus = false,
  debounceTime = 0,
}: SearchBoxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync local state with prop
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Handle autofocus
  useEffect(() => {
    if ((autoFocus || searchQuery) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, searchQuery]);

  // Handle input changes
  const handleInputChange = (value: string) => {
    setLocalQuery(value);

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    if (debounceTime > 0) {
      debounceTimerRef.current = setTimeout(() => {
        onSearch(value);
      }, debounceTime);
    } else {
      onSearch(value);
    }
  };

  // Handle clear button
  const handleClear = () => {
    setLocalQuery("");
    onClear();
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="relative" data-testid="search-box">
      <div
        className={`
          border rounded-full flex items-center px-4 py-3 
          ${isFocused ? "border-sakura ring-2 ring-sakura-light" : "border-gray-200"}
          bg-white shadow-sm transition-all duration-300
        `}
        role="search"
      >
        {/* Search icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-sakura"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {/* Search input */}
        <input
          ref={inputRef}
          type="text"
          id="breed-search"
          placeholder={placeholder}
          className="ml-2 flex-1 outline-none text-gray-700 placeholder-gray-400"
          value={localQuery}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search for dog breeds"
          autoComplete="off"
        />
        {/* Clear button */}
        {localQuery && (
          <button
            onClick={handleClear}
            className="p-1 rounded-full hover:bg-sakura-light transition-colors duration-200"
            aria-label="Clear search"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-sakura"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(SearchBox);
