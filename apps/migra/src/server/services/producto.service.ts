import { productoRepository } from "@/server/repository/producto.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";
import { CreateProductoDto, UpdateProductoDto } from "@/types/producto.types";

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

  async delete(id: number) {
    await this.findById(id);

    return productoRepository.softDelete(id);
  },

  async findAll(search?: string, empresaId?: number) {
    return productoRepository.findAll(search, empresaId);
  },
};
