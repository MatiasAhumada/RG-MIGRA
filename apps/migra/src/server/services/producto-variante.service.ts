import { productoVarianteRepository } from "@/server/repository/producto-variante.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";
import {
  PRODUCTO_VARIANTE_NOT_FOUND,
  PRODUCTO_VARIANTE_ALREADY_EXISTS,
} from "@/constants/error-messages.constant";
import type {
  CreateProductoVarianteDto,
  UpdateProductoVarianteDto,
} from "@/types/producto-variante.types";

export const productoVarianteService = {
  async findAll(productoId?: number) {
    return productoVarianteRepository.findAll(productoId);
  },

  async findById(id: number) {
    const variante = await productoVarianteRepository.findById(id);

    if (!variante) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: PRODUCTO_VARIANTE_NOT_FOUND,
      });
    }

    return variante;
  },

  async findByProductoId(productoId: number) {
    return productoVarianteRepository.findByProductoId(productoId);
  },

  async create(dto: CreateProductoVarianteDto) {
    const existingVariantes = await productoVarianteRepository.findByProductoId(
      dto.productoId,
    );

    const duplicate = existingVariantes.find(
      (v) =>
        v.color === dto.color &&
        v.talle === dto.talle &&
        (dto.color || dto.talle),
    );

    if (duplicate) {
      throw new ApiError({
        status: httpStatus.CONFLICT,
        message: PRODUCTO_VARIANTE_ALREADY_EXISTS,
      });
    }

    return productoVarianteRepository.create(dto);
  },

  async update(id: number, dto: UpdateProductoVarianteDto) {
    await this.findById(id);
    return productoVarianteRepository.update(id, dto);
  },

  async delete(id: number) {
    await this.findById(id);
    return productoVarianteRepository.delete(id);
  },

  async toggleSinStock(id: number, sinStock: boolean) {
    await this.findById(id);
    return productoVarianteRepository.toggleSinStock(id, sinStock);
  },
};
