import { ColorProducto } from "@prisma/client";

export const COLOR_LETTER_MAP: Record<string, ColorProducto> = {
  b: ColorProducto.BLANCO,
  B: ColorProducto.BLANCO,
  c: ColorProducto.CELESTE,
  C: ColorProducto.CELESTE,
  r: ColorProducto.ROSA,
  R: ColorProducto.ROSA,
  v: ColorProducto.VERDE,
  V: ColorProducto.VERDE,
  n: ColorProducto.NEGRO,
  N: ColorProducto.NEGRO,
  g: ColorProducto.GRIS,
  G: ColorProducto.GRIS,
  gris: ColorProducto.GRIS,
  GRIS: ColorProducto.GRIS,
};

export const COLORES_PRODUCTO = [
  { value: ColorProducto.BLANCO, label: "Blanco" },
  { value: ColorProducto.CELESTE, label: "Celeste" },
  { value: ColorProducto.ROSA, label: "Rosa" },
  { value: ColorProducto.VERDE, label: "Verde" },
  { value: ColorProducto.NEGRO, label: "Negro" },
  { value: ColorProducto.GRIS, label: "Gris" },
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

export const COLOR_NAMES: Record<ColorProducto, string> = {
  BLANCO: "Blanco",
  CELESTE: "Celeste",
  ROSA: "Rosa",
  VERDE: "Verde",
  NEGRO: "Negro",
  GRIS: "Gris",
};

export const COLOR_CLASSES: Record<ColorProducto, string> = {
  BLANCO: "bg-white border-2 border-gray-300",
  CELESTE: "bg-sky-400",
  ROSA: "bg-pink-400",
  VERDE: "bg-green-600",
  NEGRO: "bg-gray-900",
  GRIS: "bg-gray-500",
};
