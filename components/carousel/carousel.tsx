"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

interface CarouselProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
  transitionDuration?: number;
}

export default function Carousel({
  images,
  initialIndex,
  onClose,
  transitionDuration = 300,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial position without animation
    if (carouselRef.current) {
      carouselRef.current.scrollLeft =
        initialIndex * carouselRef.current.offsetWidth;
    }
  }, [initialIndex]);

  const animateSlide = (
    direction: "next" | "prev",
    targetIndex: number,
  ): void => {
    const carousel = carouselRef.current;

    if (!carousel || isAnimating) return;

    setIsAnimating(true);
    const containerWidth = carousel.offsetWidth;
    const isWrappingForward = direction === "next" && targetIndex === 0;
    const isWrappingBackward =
      direction === "prev" && targetIndex === images.length - 1;

    if (isWrappingForward) {
      carousel.scrollTo({
        left: containerWidth * currentIndex,
        behavior: "smooth",
      });
      setTimeout(() => {
        if (carousel) {
          carousel.scrollLeft = 0;
          setCurrentIndex(0);
          setIsAnimating(false);
        }
      }, transitionDuration);
    } else if (isWrappingBackward) {
      carousel.scrollLeft = 0;
      setTimeout(() => {
        if (carousel) {
          carousel.scrollLeft = containerWidth * targetIndex;
          setCurrentIndex(targetIndex);
          setIsAnimating(false);
        }
      }, 10);
    } else {
      carousel.scrollTo({
        left: containerWidth * targetIndex,
        behavior: "smooth",
      });
      setTimeout(() => {
        setCurrentIndex(targetIndex);
        setIsAnimating(false);
      }, transitionDuration);
    }
  };

  const goToNext = (): void => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    animateSlide("next", nextIndex);
  };

  const goToPrevious = (): void => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    animateSlide("prev", prevIndex);
  };

  return (
    <div className="fixed inset-0 bg-cream bg-opacity-95 flex justify-center items-center z-50 p-4">
      <div className="w-full h-full max-w-md max-h-md relative flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-sakura rounded-full p-2 duration-300 shadow-md"
          aria-label="Close carousel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Image */}
        <div
          ref={carouselRef}
          className="flex-1 relative overflow-hidden rounded-lg"
          aria-live="polite"
          role="region"
          aria-roledescription="carousel"
          aria-label="Image carousel"
        >
          <div className="absolute inset-0 flex w-full h-full">
            {images.map((image, index) => (
              <div
                key={`slide-${index}`}
                className="flex-shrink-0 w-full h-full flex justify-center items-center"
                aria-hidden={index !== currentIndex}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${images.length}`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={`Doggy-${index + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority={index === currentIndex}
                    unoptimized={true}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Previous button */}
        <div className="absolute inset-y-0 left-4 flex items-center">
          <button
            onClick={goToPrevious}
            className="p-3 rounded-full bg-sakura-light"
            aria-label="Previous image"
            disabled={isAnimating}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
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
        </div>
        {/* Next button */}
        <div className="absolute inset-y-0 right-4 flex items-center">
          <button
            onClick={goToNext}
            className="p-3 rounded-full bg-sakura-light"
            aria-label="Next image"
            disabled={isAnimating}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {/* Counter */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="bg-sakura px-6 py-2 rounded-full text-white font-medium shadow-lg border-2 border-white flex items-center">
            <span className="mr-2">🐶</span>
            <span>
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
