import { prisma } from "@/lib/prisma";
import type { CreateAddressDto, UpdateAddressDto } from "@/types/address.types";

export const addressRepository = {
  async create(dto: CreateAddressDto) {
    return prisma.address.create({
      data: dto,
    });
  },

  async findById(id: number) {
    return prisma.address.findUnique({
      where: { id },
    });
  },

  async findByClienteId(clienteId: number) {
    return prisma.address.findMany({
      where: {
        clienteId,
        deletedAt: null,
      },
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
};
