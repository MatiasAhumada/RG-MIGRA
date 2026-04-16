import { productoRepository } from "@/server/repository/producto.repository";
import { productoVarianteRepository } from "@/server/repository/producto-variante.repository";
import { r2StorageService } from "@/server/services/r2-storage.service";
import { pdfParserService } from "@/server/services/pdf-parser.service";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";
import {
  CreateProductoDto,
  UpdateProductoDto,
  BulkCreateProductoDto,
} from "@/types/producto.types";

export const productoService = {
  async create(dto: CreateProductoDto) {
    const existingSku = await productoRepository.findBySku(dto.sku);

    if (existingSku) {
      throw new ApiError({
        status: httpStatus.CONFLICT,
        message: ERROR_MESSAGES.PRODUCTO_SKU_EXISTS,
      });
    }

    const { variantes, ...productoData } = dto;
    const producto = await productoRepository.create(productoData);

    if (variantes && variantes.length > 0) {
      for (const variante of variantes) {
        await productoVarianteRepository.create({
          ...variante,
          productoId: producto.id,
        });
      }
    }

    return productoRepository.findById(producto.id);
  },

  async findById(id: number) {
    const producto = await productoRepository.findById(id);

    if (!producto) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.PRODUCTO_NOT_FOUND,
      });
    }

    return producto;
  },

  async findByEmpresaId(empresaId: number) {
    return productoRepository.findByEmpresaId(empresaId);
  },

  async findByMarca(marcaId: number, empresaId: number) {
    return productoRepository.findByMarca(marcaId, empresaId);
  },

  async findByCategoria(categoriaId: number, empresaId: number) {
    return productoRepository.findByCategoria(categoriaId, empresaId);
  },

  async findBySubcategoria(subcategoriaId: number, empresaId: number) {
    return productoRepository.findBySubcategoria(subcategoriaId, empresaId);
  },

  async update(id: number, dto: UpdateProductoDto) {
    await this.findById(id);

    if (dto.sku) {
      const existingSku = await productoRepository.findBySku(dto.sku);

      if (existingSku && existingSku.id !== id) {
        throw new ApiError({
          status: httpStatus.CONFLICT,
          message: ERROR_MESSAGES.PRODUCTO_SKU_EXISTS,
        });
      }
    }

    return productoRepository.update(id, dto);
  },

  async updateImage(id: number, imageBase64: string) {
    const producto = await this.findById(id);

    if (producto.imgUrl) {
      const oldKey = r2StorageService.extractKeyFromUrl(producto.imgUrl);
      if (oldKey) {
        await r2StorageService.deleteImage(oldKey);
      }
    }

    const buffer = Buffer.from(imageBase64, "base64");
    const key = r2StorageService.generateProductKey(id, producto.sku);
    const { url } = await r2StorageService.uploadImage(buffer, key);

    return productoRepository.update(id, { imgUrl: url });
  },

  async delete(id: number) {
    const producto = await this.findById(id);

    if (producto.imgUrl) {
      const key = r2StorageService.extractKeyFromUrl(producto.imgUrl);
      if (key) {
        await r2StorageService.deleteImage(key);
      }
    }

    return productoRepository.softDelete(id);
  },

  async restore(id: number) {
    const producto = await productoRepository.findByIdIncludingDeleted(id);

    if (!producto) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.PRODUCTO_NOT_FOUND,
      });
    }

    return productoRepository.restore(id);
  },

  async findAll(search?: string, empresaId?: number) {
    return productoRepository.findAll(search, empresaId);
  },

  async findAllActive(search?: string, empresaId?: number) {
    return productoRepository.findAllActive(search, empresaId);
  },

  async toggleSinStock(id: number) {
    const producto = await this.findById(id);

    return productoRepository.update(id, { sinStock: !producto.sinStock });
  },

  async bulkCreateFromPdf(dto: BulkCreateProductoDto) {
    const parsedProducts = await pdfParserService.parseProductCatalog(
      dto.pdfBuffer,
    );

    const created = [];
    const errors = [];

    for (const parsed of parsedProducts) {
      try {
        const existing = await productoRepository.findBySku(parsed.sku);

        if (existing) {
          errors.push({
            sku: parsed.sku,
            error: ERROR_MESSAGES.PRODUCTO_SKU_EXISTS,
          });
          continue;
        }

        const producto = await productoRepository.create({
          sku: parsed.sku,
          name: parsed.name,
          price: dto.defaultPrice,
          empresaId: dto.empresaId,
          categoriaId: dto.categoriaId,
          subcategoriaId: dto.subcategoriaId,
          marcaId: dto.marcaId,
        });

        created.push(producto);
      } catch (error) {
        errors.push({ sku: parsed.sku, error: (error as Error).message });
      }
    }

    return { created, errors, total: parsedProducts.length };
  },
};
