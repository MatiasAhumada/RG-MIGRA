import {
  ProductoVariante as PrismaProductoVariante,
  ColorProducto as PrismaColorProducto,
} from "@prisma/client";
import { Producto } from "./producto.types";

export type ProductoVariante = PrismaProductoVariante;

export type ColorProducto = PrismaColorProducto;

export interface CreateProductoVarianteDto {
  sku?: string;
  color?: ColorProducto;
  talle?: number;
  sinStock?: boolean;
  productoId: number;
  imgUrl?: string;
}

export interface UpdateProductoVarianteDto extends Partial<CreateProductoVarianteDto> {}

export interface ProductoVarianteWithProducto extends ProductoVariante {
  producto: Producto;
}
