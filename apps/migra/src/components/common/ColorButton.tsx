import { COLOR_CLASSES, COLOR_NAMES } from "@/constants/producto.constant";
import type { ColorProducto } from "@/types/producto-variante.types";

interface ColorButtonProps {
  color: ColorProducto;
  selected: boolean;
  onClick: () => void;
}

export function ColorButton({ color, selected, onClick }: ColorButtonProps) {
  const baseClasses =
    "flex size-10 items-center justify-center rounded-full transition-all";
  const selectedClasses = selected ? "ring-4 ring-primary ring-offset-2" : "";
  const colorClass = COLOR_CLASSES[color];

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorClass} ${selectedClasses}`}
      title={COLOR_NAMES[color]}
    />
  );
}
