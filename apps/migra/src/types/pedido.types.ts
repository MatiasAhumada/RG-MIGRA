import {
  Pedido as PrismaPedido,
  PedidoStatus as PrismaPedidoStatus,
} from "@prisma/client";

export type Pedido = PrismaPedido;

export type PedidoStatus = PrismaPedidoStatus;

export interface CreatePedidoDto {
  totalPedido: number;
  clienteId: number;
  direccionId: number;
  status?: PedidoStatus;
}

export interface UpdatePedidoDto extends Partial<CreatePedidoDto> {}

export interface PedidoWithRelations extends Pedido {
  cliente: Cliente;
  direccion: Address;
  detalles: DetallePedido[];
}

import { Cliente } from "./cliente.types";
import { Address } from "./address.types";
import { DetallePedido } from "./detalle-pedido.types";
