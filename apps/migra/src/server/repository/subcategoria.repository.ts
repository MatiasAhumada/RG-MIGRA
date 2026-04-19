import { prisma } from "@/lib/prisma";

export const subcategoriaRepository = {
  async findByName(name: string, categoriaId: number) {
    return prisma.subcategoria.findFirst({
      where: { name: { equals: name, mode: "insensitive" }, categoriaId },
    });
  },

  async create(data: { name: string; categoriaId: number; empresaId: number }) {
    return prisma.subcategoria.create({ data });
  },

  async findById(id: number) {
    return prisma.subcategoria.findUnique({
      where: { id },
    });
  },
};
