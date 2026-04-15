import { prisma } from "@/lib/prisma";

export const categoriaRepository = {
  async findAll(empresaId?: number, marcaId?: number) {
    const where: Record<string, unknown> = { deletedAt: null };
    if (empresaId) where.empresaId = empresaId;
    if (marcaId) where.marcaId = marcaId;

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

  async findByMarcaId(marcaId: number) {
    return prisma.categoria.findMany({
      where: { marcaId, deletedAt: null },
      include: {
        subcategorias: {
          where: { deletedAt: null },
        },
      },
      orderBy: { name: "asc" },
    });
  },
};
