import { Producto as PrismaProducto } from "@prisma/client";

export type Producto = PrismaProducto;

export interface CreateProductoDto {
  name: string;
  sku: string;
  price: number;
  imgUrl?: string;
  empresaId: number;
  categoriaId: number;
  subcategoriaId: number;
  marcaId: number;
  sinStock?: boolean;
  variantes?: CreateProductoVarianteDto[];
}

export interface UpdateProductoDto extends Partial<CreateProductoDto> {}

export interface BulkCreateProductoDto {
  pdfBuffer: Buffer;
  defaultPrice: number;
  empresaId: number;
  categoriaId: number;
  subcategoriaId: number;
  marcaId: number;
}

export interface UpdateProductoImageDto {
  imageBase64: string;
}

export interface ProductoWithEmpresa extends Producto {
  empresa: Empresa;
}

export interface ProductoWithRelations extends Producto {
  empresa: Empresa;
  categoria: Categoria;
  subcategoria: Subcategoria;
  marca: Marca;
  variantes: ProductoVariante[];
}

export interface ParsedProduct {
  sku: string;
  name: string;
  presentacion?: string;
}

import { Empresa } from "./empresa.types";
import { Categoria } from "./categoria.types";
import { Subcategoria } from "./subcategoria.types";
import { Marca } from "./marca.types";
import {
  ProductoVariante,
  CreateProductoVarianteDto,
} from "./producto-variante.types";
