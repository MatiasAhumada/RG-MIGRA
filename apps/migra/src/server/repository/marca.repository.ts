import { prisma } from "@/lib/prisma";

export const marcaRepository = {
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
