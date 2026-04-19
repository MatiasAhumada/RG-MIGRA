import { ColorProducto } from "@prisma/client";

export const COLOR_LETTER_MAP: Record<string, ColorProducto> = {
  b: ColorProducto.BLANCO,
  c: ColorProducto.CELESTE,
  r: ColorProducto.ROSA,
  v: ColorProducto.VERDE,
  n: ColorProducto.NEGRO,
};

export const COLORES_PRODUCTO = [
  { value: ColorProducto.BLANCO, label: "Blanco" },
  { value: ColorProducto.CELESTE, label: "Celeste" },
  { value: ColorProducto.ROSA, label: "Rosa" },
  { value: ColorProducto.VERDE, label: "Verde" },
  { value: ColorProducto.NEGRO, label: "Negro" },
] as const;

export const TALLES_PRODUCTO = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
] as const;
