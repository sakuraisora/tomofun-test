"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { fetchBreedImages } from "@/lib/api";

import ImageGrid from "../breed-list/image-grid";
import Carousel from "../carousel/carousel";

/**
 * BreedImages
 * @param {string} breed
 */
export default function BreedImages({ breed }: { breed: string }) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      if (images.length > 0) return;

      try {
        setIsLoading(true);
        setError(null);

        const data = await Promise.race([
          fetchBreedImages(breed, 50),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 10000),
          ),
        ]);

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No images found for this breed.");
        }

        setImages(data);
      } catch (err) {
        console.error("Error loading breed images:", err);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [breed, images.length]);

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
    );

  return (
    <div className="p-4 max-w-md mx-auto">
      <Header breedName={breed} onBack={() => router.push("/")} />
      {/* Image grid container */}
      <div className="bg-white rounded-lg shadow-sakura p-4 overflow-hidden">
        <ImageGrid
          images={images}
          onImageClick={(index) => {
            setSelectedImageIndex(index);
            setCarouselOpen(true);
          }}
        />
      </div>
      {/* Carousel modal */}
      {carouselOpen && (
        <Carousel
          images={images}
          initialIndex={selectedImageIndex}
          onClose={() => setCarouselOpen(false)}
        />
      )}
    </div>
  );
}

/**
 * Loading Spinner
 */
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen bg-cream">
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sakura"></div>
      <div className="absolute inset-0 flex items-center justify-center text-2xl">
        🐾
      </div>
    </div>
  </div>
);

/**
 * Error
 * @param { error: string, onRetry: () => void }
 */
const ErrorDisplay = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md mx-auto mt-8">
    <svg
      className="w-12 h-12 mx-auto text-red-500 mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
    <p className="text-center">{error}</p>
    <div className="flex justify-center">
      <button
        onClick={onRetry}
        className="mt-4 bg-sakura text-white px-6 py-2 rounded-full"
      >
        Try Again
      </button>
    </div>
  </div>
);

/**
 * Header
 * @param { breedName: string, breedEmoji: string, onBack: () => void }
 */
const Header = ({
  breedName,
  onBack,
}: {
  breedName: string;
  onBack: () => void;
}) => (
  <div className="bg-white rounded-lg shadow-sakura p-4 mb-6">
    <div className="flex items-center">
      <button
        onClick={onBack}
        className="mr-3 p-2 rounded-full"
        aria-label="Go back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-sakura"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1 className="text-xl font-bold capitalize text-brown flex items-center">
        {breedName}
      </h1>
    </div>
  </div>
);
