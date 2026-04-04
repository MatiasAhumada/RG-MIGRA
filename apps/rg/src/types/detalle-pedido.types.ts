import { DetallePedido as PrismaDetallePedido } from "@prisma/client";

export type DetallePedido = PrismaDetallePedido;

export interface CreateDetallePedidoDto {
  cantidad: number;
  total: number;
  pedidoId: number;
  productoId: number;
}

export interface UpdateDetallePedidoDto extends Partial<CreateDetallePedidoDto> {}

export interface DetallePedidoWithRelations extends DetallePedido {
  pedido: Pedido;
  producto: Producto;
}

import { Pedido } from "./pedido.types";
import { Producto } from "./producto.types";
