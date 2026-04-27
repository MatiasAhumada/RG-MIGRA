import { Producto as PrismaProducto } from "@prisma/client";

export type Producto = PrismaProducto;

export interface CreateProductoDto {
  name: string;
  sku: string;
  price: number;
  imgUrl?: string;
  empresaId: number;
  categoriaId: number;
  subcategoriaId?: number;
  marcaId: number;
  sinStock?: boolean;
  variantes?: Omit<CreateProductoVarianteDto, "productoId">[];
}

export interface UpdateProductoDto {
  name?: string;
  sku?: string;
  price?: number;
  imgUrl?: string;
  categoriaId?: number;
  subcategoriaId?: number;
  marcaId?: number;
  sinStock?: boolean;
}

export interface BulkCreateProductoDto {
  excelBuffer?: Buffer;
  pdfBuffer?: Buffer;
  defaultPrice: number;
  empresaId: number;
  categoriaId: number;
  subcategoriaId: number;
  marcaId: number;
}

export interface UpdateProductoImageDto {
  imageBase64: string;
}

export interface BulkUploadImagesDto {
  images: {
    sku: string;
    file: Buffer;
    fileName: string;
  }[];
}

export interface BulkUploadImagesResult {
  success: number;
  failed: number;
  results: {
    sku: string;
    success: boolean;
    url?: string;
    error?: string;
  }[];
}

export interface ProductoWithEmpresa extends Producto {
  empresa: Empresa;
}

export interface ProductoWithRelations extends Producto {
  empresa: Empresa;
  categoria: Categoria;
  subcategoria: Subcategoria | null;
  marca: Marca;
  variantes: ProductoVariante[];
}

export interface ParsedProduct {
  sku: string;
  name: string;
  presentacion?: string;
}

export interface ParsedProductExcel {
  marca: string;
  categoria: string;
  subcategoria: string | null;
  sku: string;
  name: string;
  colorTalle: string;
  price: number;
}

import { Empresa } from "./empresa.types";
import { Categoria } from "./categoria.types";
import { Subcategoria } from "./subcategoria.types";
import { Marca } from "./marca.types";
import {
  ProductoVariante,
  CreateProductoVarianteDto,
} from "./producto-variante.types";
