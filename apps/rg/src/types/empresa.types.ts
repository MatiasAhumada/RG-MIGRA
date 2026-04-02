import { Empresa as PrismaEmpresa } from "@prisma/client";

export type Empresa = PrismaEmpresa;

export interface CreateEmpresaDto {
  name: string;
}

export interface UpdateEmpresaDto extends Partial<CreateEmpresaDto> {}

export interface EmpresaWithRelations extends Empresa {
  clientes: Cliente[];
  productos: Producto[];
}

import { Cliente } from "./cliente.types";
import { Producto } from "./producto.types";
