import { useEffect } from "react";

export function useCarouselAutoRotate(
  enabled: boolean,
  totalImages: number,
  interval: number,
  onRotate: () => void,
) {
  useEffect(() => {
    if (!enabled || totalImages <= 1) return;

    const timer = setInterval(() => {
      onRotate();
    }, interval);

    return () => clearInterval(timer);
  }, [enabled, totalImages, interval, onRotate]);
}
