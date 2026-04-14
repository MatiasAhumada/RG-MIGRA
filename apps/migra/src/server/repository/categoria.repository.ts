import { prisma } from "@/lib/prisma";

export const categoriaRepository = {
  async findAll(empresaId?: number) {
    const where = empresaId ? { empresaId, deletedAt: null } : { deletedAt: null };

    return prisma.categoria.findMany({
      where,
      include: {
        subcategorias: {
          where: { deletedAt: null },
        },
      },
      orderBy: { name: "asc" },
    });
  },

  async findById(id: number) {
    return prisma.categoria.findUnique({
      where: { id },
      include: {
        subcategorias: {
          where: { deletedAt: null },
        },
      },
    });
  },
};
