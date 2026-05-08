import { prisma } from "@/lib/prisma";
import type { CreatePedidoDto } from "@/types/pedido.types";
import type { PedidoStatus } from "@prisma/client";

export const pedidoRepository = {
  async create(dto: Omit<CreatePedidoDto, "detalles">) {
    return prisma.pedido.create({
      data: dto,
    });
  },

  async findById(id: number) {
    return prisma.pedido.findUnique({
      where: { id },
      include: {
        cliente: {
          select: {
            razonSocial: true,
            titular: true,
            correo: true,
            cuit: true,
          },
        },
        direccion: {
          select: {
            direccion: true,
            localidad: true,
            provincia: true,
          },
        },
        detalles: {
          include: {
            producto: {
              select: {
                name: true,
                sku: true,
                price: true,
              },
            },
          },
        },
      },
    });
  },

  async findByClienteId(clienteId: number) {
    return prisma.pedido.findMany({
      where: {
        clienteId,
        deletedAt: null,
      },
      include: {
        cliente: {
          select: {
            razonSocial: true,
            titular: true,
            correo: true,
            cuit: true,
          },
        },
        direccion: {
          select: {
            direccion: true,
            localidad: true,
            provincia: true,
          },
        },
        detalles: {
          include: {
            producto: {
              select: {
                name: true,
                sku: true,
                price: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async findAll() {
    return prisma.pedido.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        cliente: {
          select: {
            razonSocial: true,
            titular: true,
            correo: true,
            cuit: true,
          },
        },
        direccion: {
          select: {
            direccion: true,
            localidad: true,
            provincia: true,
          },
        },
        detalles: {
          include: {
            producto: {
              select: {
                name: true,
                sku: true,
                price: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async updateStatus(id: number, status: PedidoStatus) {
    return prisma.pedido.update({
      where: { id },
      data: { status },
    });
  },

  async update(
    id: number,
    data: { status?: PedidoStatus; codSeguimiento?: string },
  ) {
    return prisma.pedido.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return prisma.pedido.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },
};
