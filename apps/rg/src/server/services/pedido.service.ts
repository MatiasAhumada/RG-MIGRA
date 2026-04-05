import { pedidoRepository } from "@/server/repository/pedido.repository";
import { clienteRepository } from "@/server/repository/cliente.repository";
import { addressRepository } from "@/server/repository/address.repository";
import { detallePedidoRepository } from "@/server/repository/detalle-pedido.repository";
import { productoRepository } from "@/server/repository/producto.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";
import {
  CreatePedidoDto,
  UpdatePedidoDto,
  PedidoStatus,
} from "@/types/pedido.types";
import { CreateDetallePedidoDto } from "@/types/detalle-pedido.types";

interface CreatePedidoWithDetallesDto extends CreatePedidoDto {
  detalles: CreateDetallePedidoDto[];
}

export const pedidoService = {
  async create(dto: CreatePedidoWithDetallesDto) {
    const cliente = await clienteRepository.findById(dto.clienteId);

    if (!cliente) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.CLIENTE_NOT_FOUND,
      });
    }

    const direccion = await addressRepository.findById(dto.direccionId);

    if (!direccion) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ADDRESS_NOT_FOUND,
      });
    }

    if (direccion.clienteId !== dto.clienteId) {
      throw new ApiError({
        status: httpStatus.BAD_REQUEST,
        message: ERROR_MESSAGES.VALIDATION_ERROR,
      });
    }

    for (const detalle of dto.detalles) {
      const producto = await productoRepository.findById(detalle.productoId);

      if (!producto) {
        throw new ApiError({
          status: httpStatus.NOT_FOUND,
          message: ERROR_MESSAGES.PRODUCTO_NOT_FOUND,
        });
      }
    }

    const { detalles, ...pedidoData } = dto;

    const pedido = await pedidoRepository.create(pedidoData);

    const detallesWithPedidoId = detalles.map((detalle) => ({
      ...detalle,
      pedidoId: pedido.id,
    }));

    await detallePedidoRepository.createMany(detallesWithPedidoId);

    return this.findById(pedido.id);
  },

  async findById(id: number) {
    const pedido = await pedidoRepository.findById(id);

    if (!pedido) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.PEDIDO_NOT_FOUND,
      });
    }

    return pedido;
  },

  async findByClienteId(clienteId: number) {
    const cliente = await clienteRepository.findById(clienteId);

    if (!cliente) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.CLIENTE_NOT_FOUND,
      });
    }

    return pedidoRepository.findByClienteId(clienteId);
  },

  async findByStatus(status: PedidoStatus) {
    return pedidoRepository.findByStatus(status);
  },

  async update(id: number, dto: UpdatePedidoDto) {
    await this.findById(id);

    if (dto.clienteId) {
      const cliente = await clienteRepository.findById(dto.clienteId);

      if (!cliente) {
        throw new ApiError({
          status: httpStatus.NOT_FOUND,
          message: ERROR_MESSAGES.CLIENTE_NOT_FOUND,
        });
      }
    }

    if (dto.direccionId) {
      const direccion = await addressRepository.findById(dto.direccionId);

      if (!direccion) {
        throw new ApiError({
          status: httpStatus.NOT_FOUND,
          message: ERROR_MESSAGES.ADDRESS_NOT_FOUND,
        });
      }
    }

    return pedidoRepository.update(id, dto);
  },

  async delete(id: number) {
    await this.findById(id);

    return pedidoRepository.softDelete(id);
  },

  async findAll(clienteId?: number) {
    return pedidoRepository.findAll(clienteId);
  },
};
