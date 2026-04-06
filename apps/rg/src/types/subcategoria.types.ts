import { Subcategoria as PrismaSubcategoria } from "@prisma/client";

export type Subcategoria = PrismaSubcategoria;

export interface CreateSubcategoriaDto {
  name: string;
  categoriaId: number;
  empresaId: number;
}

export interface UpdateSubcategoriaDto extends Partial<CreateSubcategoriaDto> {}
