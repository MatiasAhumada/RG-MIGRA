import { productoRepository } from "@/server/repository/producto.repository";
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

    return productoRepository.create(dto);
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

  async findByTipo(tipo: string, empresaId: number) {
    return productoRepository.findByTipo(tipo, empresaId);
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

  async findAll(search?: string, empresaId?: number) {
    return productoRepository.findAll(search, empresaId);
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
          tipo: dto.tipo,
          price: dto.defaultPrice,
          empresaId: dto.empresaId,
        });

        created.push(producto);
      } catch (error) {
        errors.push({ sku: parsed.sku, error: (error as Error).message });
      }
    }

    return { created, errors, total: parsedProducts.length };
  },
};
