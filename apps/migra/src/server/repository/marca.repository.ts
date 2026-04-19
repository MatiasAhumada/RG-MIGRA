import { prisma } from "@/lib/prisma";

export const marcaRepository = {
  async findByName(name: string, empresaId: number) {
    return prisma.marca.findFirst({
      where: { name: { equals: name, mode: "insensitive" }, empresaId },
    });
  },

  async create(data: { name: string; empresaId: number }) {
    return prisma.marca.create({ data });
  },

  async findAll(empresaId?: number) {
    const where = empresaId
      ? { empresaId, deletedAt: null }
      : { deletedAt: null };

    return prisma.marca.findMany({
      where,
      include: {
        categorias: {
          where: { deletedAt: null },
          include: {
            subcategorias: {
              where: { deletedAt: null },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });
  },

  async findById(id: number) {
    return prisma.marca.findUnique({
      where: { id },
      include: {
        categorias: {
          where: { deletedAt: null },
          include: {
            subcategorias: {
              where: { deletedAt: null },
            },
          },
        },
      },
    });
  },
};
