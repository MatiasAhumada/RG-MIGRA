import { productoVarianteRepository } from "@/server/repository/producto-variante.repository";
import { r2StorageService } from "@/server/services/r2-storage.service";
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

  async updateImage(id: number, imageBase64: string) {
    const variante = await this.findById(id);
    const producto = await productoVarianteRepository.findById(id);

    if (!producto) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: PRODUCTO_VARIANTE_NOT_FOUND,
      });
    }

    if (variante.imgUrl) {
      const oldKey = r2StorageService.extractKeyFromUrl(variante.imgUrl);
      if (oldKey) {
        await r2StorageService.deleteImage(oldKey);
      }
    }

    const buffer = Buffer.from(imageBase64, "base64");
    const colorLetter = variante.color?.toLowerCase().charAt(0);
    const key = r2StorageService.generateProductKey(
      String(variante.productoId),
      colorLetter,
    );
    const { url } = await r2StorageService.uploadImage(buffer, key);

    return productoVarianteRepository.update(id, { imgUrl: url });
  },
};
