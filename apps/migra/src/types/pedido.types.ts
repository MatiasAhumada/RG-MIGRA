import { Pedido as PrismaPedido, PedidoStatus } from "@prisma/client";
import type { ColorProducto } from "./producto-variante.types";

export type Pedido = PrismaPedido;

export { PedidoStatus };

export interface CreatePedidoDto {
  clienteId: number;
  direccionId: number;
  totalPedido: number;
  detalles: CreateDetallePedidoDto[];
  observaciones?: string;
}

export interface CreateDetallePedidoDto {
  productoId: number;
  cantidad: number;
  total: number;
  color?: ColorProducto;
  talle?: number;
  varianteSku?: string;
}

export interface PedidoWithRelations extends Pedido {
  cliente: {
    razonSocial: string;
    titular: string;
  };
  direccion: {
    direccion: string;
    localidad: string;
    provincia: string;
  };
  detalles: Array<{
    id: number;
    cantidad: number;
    total: number;
    color?: ColorProducto;
    talle?: number;
    varianteSku?: string;
    producto: {
      name: string;
      sku: string;
      price: number;
    };
  }>;
}
