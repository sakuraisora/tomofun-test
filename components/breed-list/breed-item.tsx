import { memo, useMemo } from "react";

import Link from "next/link";

import { Breed } from "@/interface/api.interface";

const BACKGROUND_COLORS = ["bg-white", "bg-cream"];

const AVATAR_COLORS = [
  "bg-pink-100",
  "bg-purple-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-orange-100",
];

const DOG_EMOJIS = [
  /** Dog */
  "🐕",
  /** Poodle */
  "🐩",
  /** Guide */
  "🦮",
  /** Service */
  "🐕‍🦺",
  /** Face */
  "🐶",
];

interface BreedItemProps {
  breed: Breed;
  index: number;
}

/**
 * BreedItem
 * @param {BreedItemProps}
 */
function BreedItem({ breed, index }: BreedItemProps) {
  /**
   * Calculates a hash value from a string
   * @param {string} str
   * @returns {number}
   */
  const getStringHash = (str: string): number =>
    str.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

  // Memoized values to prevent recalculation on re-renders
  const memoizedValues = useMemo(() => {
    const hash = getStringHash(breed.name);

    return {
      avatarColor: AVATAR_COLORS[hash % AVATAR_COLORS.length],
      dogEmoji: DOG_EMOJIS[hash % DOG_EMOJIS.length],
      rowColor: BACKGROUND_COLORS[index % BACKGROUND_COLORS.length],
      subBreedsText:
        breed.subBreeds.length > 0
          ? `${breed.subBreeds.length} sub-breed${breed.subBreeds.length !== 1 ? "s" : ""}`
          : "",
    };
  }, [breed.name, breed.subBreeds.length, index]);

  return (
    <Link href={`/breeds/${breed.name}`} className="block">
      <div
        className={`flex items-center p-4 border-b border-sakura-light cursor-pointer duration-300 ${memoizedValues.rowColor}`}
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {/* Avatar/icon */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${memoizedValues.avatarColor}`}
        >
          <span className="text-2xl" role="img">
            {memoizedValues.dogEmoji}
          </span>
        </div>
        {/* Info */}
        <div className="ml-4 flex-1">
          <div className="font-medium capitalize text-brown">{breed.name}</div>
          {breed.subBreeds.length > 0 && (
            <div className="text-sm text-brown-light">
              {memoizedValues.subBreedsText}
            </div>
          )}
        </div>
        {/* Nav*/}
        <div className="text-sakura" aria-hidden="true">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default memo(BreedItem);
