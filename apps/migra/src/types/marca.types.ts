import { Marca as PrismaMarca } from "@prisma/client";

export type Marca = PrismaMarca;

export interface CreateMarcaDto {
  name: string;
  empresaId: number;
}

export interface UpdateMarcaDto extends Partial<CreateMarcaDto> {}
