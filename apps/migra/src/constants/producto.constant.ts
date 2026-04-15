import { ColorProducto } from "@/types/producto-variante.types";

export const COLORES_PRODUCTO = [
  { value: ColorProducto.BLANCO, label: "Blanco" },
  { value: ColorProducto.CELESTE, label: "Celeste" },
  { value: ColorProducto.ROSA, label: "Rosa" },
  { value: ColorProducto.VERDE, label: "Verde" },
  { value: ColorProducto.NEGRO, label: "Negro" },
] as const;

export const TALLES_PRODUCTO = [
  { value: 1, label: "Talle 1" },
  { value: 2, label: "Talle 2" },
] as const;
