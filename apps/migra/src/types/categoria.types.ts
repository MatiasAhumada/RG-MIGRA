import { Categoria as PrismaCategoria } from "@prisma/client";

export type Categoria = PrismaCategoria;

export interface CreateCategoriaDto {
  name: string;
  empresaId: number;
}

export interface UpdateCategoriaDto extends Partial<CreateCategoriaDto> {}

export interface CategoriaWithSubcategorias extends Categoria {
  subcategorias: Subcategoria[];
}

import { Subcategoria } from "./subcategoria.types";
