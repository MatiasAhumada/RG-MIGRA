import { prisma } from "@/lib/prisma";
import { CreateProductoDto, UpdateProductoDto } from "@/types/producto.types";

export const productoRepository = {
  async create(dto: CreateProductoDto) {
    return prisma.producto.create({
      data: dto,
    });
  },

  async findById(id: number) {
    return prisma.producto.findUnique({
      where: { id },
      include: {
        empresa: true,
        categoria: true,
        subcategoria: true,
        marca: true,
      },
    });
  },

  async findBySku(sku: string) {
    return prisma.producto.findUnique({
      where: { sku },
    });
  },

  async findByEmpresaId(empresaId: number) {
    return prisma.producto.findMany({
      where: { empresaId, deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
  },

  async findByMarca(marcaId: number, empresaId: number) {
    return prisma.producto.findMany({
      where: { marcaId, empresaId, deletedAt: null },
      include: {
        categoria: true,
        subcategoria: true,
        marca: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async findByCategoria(categoriaId: number, empresaId: number) {
    return prisma.producto.findMany({
      where: { categoriaId, empresaId, deletedAt: null },
      include: {
        categoria: true,
        subcategoria: true,
        marca: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async findBySubcategoria(subcategoriaId: number, empresaId: number) {
    return prisma.producto.findMany({
      where: { subcategoriaId, empresaId, deletedAt: null },
      include: {
        categoria: true,
        subcategoria: true,
        marca: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async update(id: number, dto: UpdateProductoDto) {
    return prisma.producto.update({
      where: { id },
      data: dto,
    });
  },

  async softDelete(id: number) {
    return prisma.producto.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  async findAll(search?: string, empresaId?: number) {
    const where = {
      deletedAt: null,
      ...(empresaId && { empresaId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { sku: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    return prisma.producto.findMany({
      where,
      include: {
        categoria: true,
        subcategoria: true,
        marca: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },
};
