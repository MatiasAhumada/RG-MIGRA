import { prisma } from "@/lib/prisma";
import type { CreateDetallePedidoDto } from "@/types/pedido.types";

export const detallePedidoRepository = {
  async create(dto: CreateDetallePedidoDto & { pedidoId: number }) {
    return prisma.detallePedido.create({
      data: dto,
    });
  },

  async findById(id: number) {
    return prisma.detallePedido.findUnique({
      where: { id },
      include: {
        producto: true,
      },
    });
  },

  async findAll() {
    return prisma.detallePedido.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        producto: true,
      },
    });
  },

  async findByPedidoId(pedidoId: number) {
    return prisma.detallePedido.findMany({
      where: { pedidoId },
      include: {
        producto: true,
      },
    });
  },

  async update(id: number, dto: Partial<CreateDetallePedidoDto>) {
    return prisma.detallePedido.update({
      where: { id },
      data: dto,
    });
  },

  async delete(id: number) {
    return prisma.detallePedido.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },
};
