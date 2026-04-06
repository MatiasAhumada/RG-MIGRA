import { prisma } from "@/lib/prisma";
import {
  CreateClienteDto,
  UpdateClienteDto,
  ClienteStatus,
} from "@/types/cliente.types";

export const clienteRepository = {
  async create(dto: CreateClienteDto) {
    return prisma.cliente.create({
      data: dto,
    });
  },

  async findById(id: number) {
    return prisma.cliente.findUnique({
      where: { id },
      include: {
        empresa: true,
        user: true,
        direcciones: true,
        pedidos: true,
      },
    });
  },

  async findByCuit(cuit: string) {
    return prisma.cliente.findUnique({
      where: { cuit },
    });
  },

  async findByCorreo(correo: string) {
    return prisma.cliente.findUnique({
      where: { correo },
    });
  },

  async findByEmpresaId(empresaId: number) {
    return prisma.cliente.findMany({
      where: { empresaId, deletedAt: null },
      include: {
        direcciones: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async findByStatus(status: ClienteStatus, empresaId: number) {
    return prisma.cliente.findMany({
      where: { status, empresaId, deletedAt: null },
      include: {
        direcciones: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async update(id: number, dto: UpdateClienteDto) {
    return prisma.cliente.update({
      where: { id },
      data: dto,
    });
  },

  async softDelete(id: number) {
    return prisma.cliente.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  async findAll(search?: string, empresaId?: number) {
    const where = {
      deletedAt: null,
      ...(empresaId && { empresaId }),
      ...(search && {
        OR: [
          { razonSocial: { contains: search, mode: "insensitive" as const } },
          { titular: { contains: search, mode: "insensitive" as const } },
          { cuit: { contains: search } },
          { correo: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    return prisma.cliente.findMany({
      where,
      include: {
        direcciones: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },
};
