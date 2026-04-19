import { prisma } from "@/lib/prisma";
import type {
  CreateProductoVarianteDto,
  UpdateProductoVarianteDto,
} from "@/types/producto-variante.types";

export const productoVarianteRepository = {
  async findAll(productoId?: number) {
    const where = productoId
      ? { productoId, deletedAt: null }
      : { deletedAt: null };

    return prisma.productoVariante.findMany({
      where,
      include: {
        producto: true,
      },
      orderBy: [{ color: "asc" }, { talle: "asc" }],
    });
  },

  async findById(id: number) {
    return prisma.productoVariante.findUnique({
      where: { id },
      include: {
        producto: true,
      },
    });
  },

  async findByProductoId(productoId: number) {
    return prisma.productoVariante.findMany({
      where: { productoId, deletedAt: null },
      orderBy: [{ color: "asc" }, { talle: "asc" }],
    });
  },

  async create(dto: CreateProductoVarianteDto) {
    return prisma.productoVariante.create({
      data: dto,
      include: {
        producto: true,
      },
    });
  },

  async update(id: number, dto: UpdateProductoVarianteDto) {
    return prisma.productoVariante.update({
      where: { id },
      data: dto,
      include: {
        producto: true,
      },
    });
  },

  async delete(id: number) {
    return prisma.productoVariante.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  async toggleSinStock(id: number, sinStock: boolean) {
    return prisma.productoVariante.update({
      where: { id },
      data: { sinStock },
    });
  },

  async findByColorAndTalleIfExists(
    productoId: number,
    color?: string,
    talle?: number,
  ) {
    return prisma.productoVariante.findFirst({
      where: {
        productoId,
        color: color as never,
        talle,
        deletedAt: null,
      },
    });
  },
};
