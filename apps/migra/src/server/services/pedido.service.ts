import { pedidoRepository } from "@/server/repository/pedido.repository";
import { detallePedidoRepository } from "@/server/repository/detalle-pedido.repository";
import { addressRepository } from "@/server/repository/address.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";
import type { CreatePedidoDto } from "@/types/pedido.types";
import type { PedidoStatus } from "@prisma/client";

export const pedidoService = {
  async create(dto: CreatePedidoDto) {
    const address = await addressRepository.findById(dto.direccionId);

    if (!address) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: "Dirección no encontrada",
      });
    }

    if (address.clienteId !== dto.clienteId) {
      throw new ApiError({
        status: httpStatus.FORBIDDEN,
        message: "La dirección no pertenece al cliente",
      });
    }

    const { detalles, ...pedidoData } = dto;

    const pedido = await pedidoRepository.create(pedidoData);

    for (const detalle of detalles) {
      await detallePedidoRepository.create({
        ...detalle,
        pedidoId: pedido.id,
      });
    }

    return pedidoRepository.findById(pedido.id);
  },

  async findById(id: number) {
    const pedido = await pedidoRepository.findById(id);

    if (!pedido) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: "Pedido no encontrado",
      });
    }

    return pedido;
  },

  async findByClienteId(clienteId: number) {
    return pedidoRepository.findByClienteId(clienteId);
  },

  async updateStatus(id: number, status: PedidoStatus) {
    await this.findById(id);
    return pedidoRepository.updateStatus(id, status);
  },

  async update(
    id: number,
    data: { status?: PedidoStatus; codSeguimiento?: string },
  ) {
    await this.findById(id);
    return pedidoRepository.update(id, data);
  },

  async delete(id: number) {
    await this.findById(id);
    return pedidoRepository.delete(id);
  },
};
