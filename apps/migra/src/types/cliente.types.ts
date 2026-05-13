import {
  Cliente as PrismaCliente,
  ClienteStatus as PrismaClienteStatus,
} from "@prisma/client";

export type Cliente = PrismaCliente;

export type ClienteStatus = PrismaClienteStatus;

export interface CreateClienteDto {
  razonSocial: string;
  titular: string;
  cuit: string;
  correo: string;
  telefono: string;
  empresaId: number;
  status?: ClienteStatus;
  userId?: string | null;
}

export interface UpdateClienteDto extends Partial<CreateClienteDto> {
  deletedAt?: Date | null;
}

export interface ClienteWithRelations extends Cliente {
  empresa: Empresa;
  user: User | null;
  direcciones: Address[];
  pedidos: Pedido[];
}

import { Empresa } from "./empresa.types";
import { User } from "./user.types";
import { Address } from "./address.types";
import { Pedido } from "./pedido.types";
