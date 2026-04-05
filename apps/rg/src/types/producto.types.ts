import { Producto as PrismaProducto } from "@prisma/client";

export type Producto = PrismaProducto;

export interface CreateProductoDto {
  name: string;
  tipo: string;
  sku: string;
  price: number;
  imgUrl?: string;
  empresaId: number;
}

export interface UpdateProductoDto extends Partial<CreateProductoDto> {}

export interface BulkCreateProductoDto {
  pdfBuffer: Buffer;
  tipo: string;
  defaultPrice: number;
  empresaId: number;
}

export interface UpdateProductoImageDto {
  imageBase64: string;
}

export interface ProductoWithEmpresa extends Producto {
  empresa: Empresa;
}

export interface ParsedProduct {
  sku: string;
  name: string;
  presentacion?: string;
}

import { Empresa } from "./empresa.types";
