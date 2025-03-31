"use client";

import { memo, useState } from "react";

import Image from "next/image";

interface ImageGridProps {
  images: string[];
  onImageClick: (index: number) => void;
}

/**
 * Error when image fails to load
 */
const ErrorItem = () => (
  <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-200 flex flex-col items-center justify-center p-2">
    <span className="text-2xl mb-1" aria-hidden="true">
      🐕
    </span>
    <span className="text-xs text-center text-gray-500">Image unavailable</span>
  </div>
);

function ImageGrid({ images, onImageClick }: ImageGridProps) {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [errorImages, setErrorImages] = useState<Record<number, boolean>>({});

  // Empty state - show placeholders
  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Image
          src="/paw-print.svg"
          alt="Loading"
          width={40}
          height={40}
          className="opacity-50"
        />
        <span className="text-brown-light ml-4 mr-4">
          Sorry, no images available.
        </span>
        <Image
          src="/paw-print.svg"
          alt="Loading"
          width={40}
          height={40}
          className="opacity-50"
        />
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 gap-3"
      data-testid="image-grid"
    >
      {images.map((image, index) => {
        const isLoaded = !!loadedImages[index];
        const hasError = !!errorImages[index];
        const isPriority = index < 6;

        if (hasError) return <ErrorItem key={`${image}-${index}`} />;

        return (
          <div
            key={`${image}-${index}`}
            className="aspect-square relative cursor-pointer overflow-hidden rounded-lg bg-sakura-light"
            onClick={() => onImageClick(index)}
            role="button"
            aria-label={`View dog image ${index + 1}`}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onImageClick(index)}
          >
            {/* Loading indicator */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-sakura-light flex items-center justify-center">
                <Image
                  src="/paw-print.svg"
                  alt="Loading"
                  width={40}
                  height={40}
                  className="opacity-50"
                />
              </div>
            )}
            {/* Image */}
            <Image
              src={image}
              alt={`Dog image ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className={`object-cover hover:scale-110 transition-transform duration-300 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() =>
                setLoadedImages((prev) => ({ ...prev, [index]: true }))
              }
              onError={() => {
                setErrorImages((prev) => ({ ...prev, [index]: true }));
                console.error(
                  `Failed to load image at index ${index}: ${image}`,
                );
              }}
              priority={isPriority}
              unoptimized={true}
              loading={index < 12 ? "eager" : "lazy"}
            />
          </div>
        );
      })}
    </div>
  );
}

export default memo(ImageGrid);
