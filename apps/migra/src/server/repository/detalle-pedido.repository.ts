import { prisma } from "@/lib/prisma";
import {
  CreateDetallePedidoDto,
  UpdateDetallePedidoDto,
} from "@/types/detalle-pedido.types";

export const detallePedidoRepository = {
  async create(dto: CreateDetallePedidoDto) {
    return prisma.detallePedido.create({
      data: dto,
    });
  },

  async createMany(dtos: CreateDetallePedidoDto[]) {
    return prisma.detallePedido.createMany({
      data: dtos,
    });
  },

  async findById(id: number) {
    return prisma.detallePedido.findUnique({
      where: { id },
      include: {
        pedido: true,
        producto: true,
      },
    });
  },

  async findByPedidoId(pedidoId: number) {
    return prisma.detallePedido.findMany({
      where: { pedidoId, deletedAt: null },
      include: {
        producto: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async update(id: number, dto: UpdateDetallePedidoDto) {
    return prisma.detallePedido.update({
      where: { id },
      data: dto,
    });
  },

  async softDelete(id: number) {
    return prisma.detallePedido.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  async findAll(pedidoId?: number) {
    const where = {
      deletedAt: null,
      ...(pedidoId && { pedidoId }),
    };

    return prisma.detallePedido.findMany({
      where,
      include: {
        pedido: true,
        producto: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },
};
