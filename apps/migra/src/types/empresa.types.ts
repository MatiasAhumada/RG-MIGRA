import { Empresa as PrismaEmpresa } from "@prisma/client";

export type Empresa = PrismaEmpresa;

export interface CreateEmpresaDto {
  name: string;
}

export interface UpdateEmpresaDto extends Partial<CreateEmpresaDto> {}

export interface EmpresaWithRelations extends Empresa {
  usuarios: User[];
  clientes: Cliente[];
  productos: Producto[];
}

import { Cliente } from "./cliente.types";
import { Producto } from "./producto.types";
import { User } from "./user.types";
