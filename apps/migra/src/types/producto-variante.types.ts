import {
  ProductoVariante as PrismaProductoVariante,
  ColorProducto as PrismaColorProducto,
} from "@prisma/client";

export type ProductoVariante = PrismaProductoVariante;

export type ColorProducto = PrismaColorProducto;

export interface CreateProductoVarianteDto {
  color: ColorProducto;
  talle: number;
  sinStock?: boolean;
  productoId: number;
}

export interface UpdateProductoVarianteDto
  extends Partial<CreateProductoVarianteDto> {}

export interface ProductoVarianteWithProducto extends ProductoVariante {
  producto: Producto;
}

import { Producto } from "./producto.types";
