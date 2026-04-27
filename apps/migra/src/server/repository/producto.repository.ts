import { prisma } from "@/lib/prisma";
import { CreateProductoDto, UpdateProductoDto } from "@/types/producto.types";

export const productoRepository = {
  async create(dto: Omit<CreateProductoDto, "variantes">) {
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
        variantes: {
          orderBy: [{ color: "asc" }, { talle: "asc" }],
        },
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

  async restore(id: number) {
    return prisma.producto.update({
      where: { id },
      data: { deletedAt: null },
    });
  },

  async findByIdIncludingDeleted(id: number) {
    return prisma.producto.findUnique({
      where: { id },
      include: {
        empresa: true,
        categoria: true,
        subcategoria: true,
        marca: true,
        variantes: {
          orderBy: [{ color: "asc" }, { talle: "asc" }],
        },
      },
    });
  },

  async findAll(
    search?: string,
    empresaId?: number,
    marcaId?: number,
    categoriaId?: number,
    subcategoriaId?: number,
    page: number = 1,
    limit: number = 50,
  ) {
    const where = {
      ...(empresaId && { empresaId }),
      ...(marcaId && { marcaId }),
      ...(categoriaId && { categoriaId }),
      ...(subcategoriaId && { subcategoriaId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { sku: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      prisma.producto.findMany({
        where,
        include: {
          categoria: true,
          subcategoria: true,
          marca: true,
          variantes: {
            orderBy: [{ color: "asc" }, { talle: "asc" }],
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.producto.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async findAllActive(search?: string, empresaId?: number) {
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
        variantes: {
          orderBy: [{ color: "asc" }, { talle: "asc" }],
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },
};
