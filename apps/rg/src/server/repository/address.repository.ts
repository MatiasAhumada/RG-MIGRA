import { prisma } from "@/lib/prisma";
import { CreateAddressDto, UpdateAddressDto } from "@/types/address.types";

export const addressRepository = {
  async create(dto: CreateAddressDto) {
    return prisma.address.create({
      data: dto,
    });
  },

  async findById(id: number) {
    return prisma.address.findUnique({
      where: { id },
      include: {
        cliente: true,
      },
    });
  },

  async findByClienteId(clienteId: number) {
    return prisma.address.findMany({
      where: { clienteId, deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
  },

  async update(id: number, dto: UpdateAddressDto) {
    return prisma.address.update({
      where: { id },
      data: dto,
    });
  },

  async softDelete(id: number) {
    return prisma.address.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  async findAll(clienteId?: number) {
    const where = {
      deletedAt: null,
      ...(clienteId && { clienteId }),
    };

    return prisma.address.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  },
};
