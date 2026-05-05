import { useEffect, useState } from "react";

export function useImagePreloader(images: string[]) {
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    if (images.length === 0) return;

    images.forEach((src, index) => {
      if (!src) return;

      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded((prev) => new Set(prev).add(index));
      };
    });
  }, [images]);

  return imagesLoaded;
}
