import { prisma } from "@/lib/prisma";
import type { CreateUserDto, UpdateUserDto } from "@/types/user.types";

export const userRepository = {
  async create(dto: CreateUserDto) {
    const { empresaId, ...rest } = dto;

    return prisma.user.create({
      data: {
        ...rest,
        ...(empresaId !== undefined && empresaId !== null
          ? { empresa: { connect: { id: empresaId } } }
          : {}),
      },
    });
  },

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async update(id: string, dto: UpdateUserDto) {
    return prisma.user.update({
      where: { id },
      data: dto,
    });
  },

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  },

  async findAll(search?: string) {
    const where = search
      ? {
          OR: [{ name: { contains: search } }, { email: { contains: search } }],
        }
      : {};

    return prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  },
};
