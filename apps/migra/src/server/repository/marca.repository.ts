import { prisma } from "@/lib/prisma";

export const marcaRepository = {
  async findAll(empresaId?: number) {
    const where = empresaId ? { empresaId, deletedAt: null } : { deletedAt: null };

    return prisma.marca.findMany({
      where,
      orderBy: { name: "asc" },
    });
  },

  async findById(id: number) {
    return prisma.marca.findUnique({
      where: { id },
    });
  },
};
