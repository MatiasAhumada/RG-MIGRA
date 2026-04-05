import { detallePedidoRepository } from "@/server/repository/detalle-pedido.repository";
import { pedidoRepository } from "@/server/repository/pedido.repository";
import { productoRepository } from "@/server/repository/producto.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";
import {
  CreateDetallePedidoDto,
  UpdateDetallePedidoDto,
} from "@/types/detalle-pedido.types";

export const detallePedidoService = {
  async create(dto: CreateDetallePedidoDto) {
    const pedido = await pedidoRepository.findById(dto.pedidoId);

    if (!pedido) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.PEDIDO_NOT_FOUND,
      });
    }

    const producto = await productoRepository.findById(dto.productoId);

    if (!producto) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.PRODUCTO_NOT_FOUND,
      });
    }

    return detallePedidoRepository.create(dto);
  },

  async findById(id: number) {
    const detalle = await detallePedidoRepository.findById(id);

    if (!detalle) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.DETALLE_PEDIDO_NOT_FOUND,
      });
    }

    return detalle;
  },

  async findByPedidoId(pedidoId: number) {
    const pedido = await pedidoRepository.findById(pedidoId);

    if (!pedido) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.PEDIDO_NOT_FOUND,
      });
    }

    return detallePedidoRepository.findByPedidoId(pedidoId);
  },

  async update(id: number, dto: UpdateDetallePedidoDto) {
    await this.findById(id);

    if (dto.pedidoId) {
      const pedido = await pedidoRepository.findById(dto.pedidoId);

      if (!pedido) {
        throw new ApiError({
          status: httpStatus.NOT_FOUND,
          message: ERROR_MESSAGES.PEDIDO_NOT_FOUND,
        });
      }
    }

    if (dto.productoId) {
      const producto = await productoRepository.findById(dto.productoId);

      if (!producto) {
        throw new ApiError({
          status: httpStatus.NOT_FOUND,
          message: ERROR_MESSAGES.PRODUCTO_NOT_FOUND,
        });
      }
    }

    return detallePedidoRepository.update(id, dto);
  },

  async delete(id: number) {
    await this.findById(id);

    return detallePedidoRepository.softDelete(id);
  },

  async findAll(pedidoId?: number) {
    return detallePedidoRepository.findAll(pedidoId);
  },
};
