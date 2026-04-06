import { prisma } from "@/lib/prisma";
import {
  CreatePedidoDto,
  UpdatePedidoDto,
  PedidoStatus,
} from "@/types/pedido.types";

export const pedidoRepository = {
  async create(dto: CreatePedidoDto) {
    return prisma.pedido.create({
      data: dto,
    });
  },

  async findById(id: number) {
    return prisma.pedido.findUnique({
      where: { id },
      include: {
        cliente: {
          include: {
            empresa: true,
          },
        },
        direccion: true,
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });
  },

  async findByClienteId(clienteId: number) {
    return prisma.pedido.findMany({
      where: { clienteId, deletedAt: null },
      include: {
        direccion: true,
        detalles: {
          include: {
            producto: true,
          },
        },
      },
      orderBy: { fecha: "desc" },
    });
  },

  async findByStatus(status: PedidoStatus) {
    return prisma.pedido.findMany({
      where: { status, deletedAt: null },
      include: {
        cliente: true,
        direccion: true,
        detalles: {
          include: {
            producto: true,
          },
        },
      },
      orderBy: { fecha: "desc" },
    });
  },

  async update(id: number, dto: UpdatePedidoDto) {
    return prisma.pedido.update({
      where: { id },
      data: dto,
    });
  },

  async softDelete(id: number) {
    return prisma.pedido.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  async findAll(clienteId?: number) {
    const where = {
      deletedAt: null,
      ...(clienteId && { clienteId }),
    };

    return prisma.pedido.findMany({
      where,
      include: {
        cliente: true,
        direccion: true,
        detalles: {
          include: {
            producto: true,
          },
        },
      },
      orderBy: { fecha: "desc" },
    });
  },
};
