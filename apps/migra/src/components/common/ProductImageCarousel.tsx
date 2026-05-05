"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { useCarouselAutoRotate } from "@/hooks/useCarouselAutoRotate";

interface ProductImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  interval?: number;
  sinStock?: boolean;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

const PLACEHOLDER_IMAGE = "/assets/images/placeholder-product.png";

export function ProductImageCarousel({
  images,
  alt,
  className,
  interval = 3000,
  sinStock = false,
  currentIndex: externalIndex,
  onIndexChange,
}: ProductImageCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = externalIndex ?? internalIndex;
  const validImages = images.filter(Boolean);
  const hasMultipleImages = validImages.length > 1;
  const currentImage = validImages[currentIndex] || PLACEHOLDER_IMAGE;

  useImagePreloader(validImages);

  useEffect(() => {
    if (!externalIndex) {
      setInternalIndex(0);
    }
  }, [images, externalIndex]);

  const handleRotate = useCallback(() => {
    const nextIndex = (currentIndex + 1) % validImages.length;
    if (onIndexChange) {
      onIndexChange(nextIndex);
    } else {
      setInternalIndex(nextIndex);
    }
  }, [currentIndex, validImages.length, onIndexChange]);

  useCarouselAutoRotate(
    hasMultipleImages,
    validImages.length,
    interval,
    handleRotate,
  );

  const handleIndicatorClick = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.preventDefault();
      e.stopPropagation();
      if (onIndexChange) {
        onIndexChange(index);
      } else {
        setInternalIndex(index);
      }
    },
    [onIndexChange],
  );

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden bg-white",
        className,
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 bg-white"
        >
          <Image
            src={currentImage}
            alt={alt}
            fill
            priority={currentIndex === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              sinStock && "grayscale",
            )}
          />
        </motion.div>
      </AnimatePresence>

      {hasMultipleImages && (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => handleIndicatorClick(e, index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-6 bg-[#2b6485] shadow-lg"
                  : "w-1.5 bg-[#2b6485]/50 hover:bg-[#2b6485]/75 shadow-md",
              )}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
