"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  interval?: number;
  sinStock?: boolean;
}

const PLACEHOLDER_IMAGE = "/assets/images/placeholder-product.png";

export function ProductImageCarousel({
  images,
  alt,
  className,
  interval = 3000,
  sinStock = false,
}: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const validImages = images.filter(Boolean);
  const hasMultipleImages = validImages.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [hasMultipleImages, validImages.length, interval]);

  const currentImage = validImages[currentIndex] || PLACEHOLDER_IMAGE;

  return (
    <div
      className={cn("relative aspect-square w-full overflow-hidden", className)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              sinStock && "grayscale",
            )}
          />
        </motion.div>
      </AnimatePresence>

      {hasMultipleImages && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/75",
              )}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
