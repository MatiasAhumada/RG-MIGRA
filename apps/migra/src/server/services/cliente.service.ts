import { clienteRepository } from "@/server/repository/cliente.repository";
import { pedidoRepository } from "@/server/repository/pedido.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";
import {
  CreateClienteDto,
  UpdateClienteDto,
  ClienteStatus,
} from "@/types/cliente.types";

export const clienteService = {
  async create(dto: CreateClienteDto) {
    const existingCuit = await clienteRepository.findByCuit(dto.cuit);

    if (existingCuit) {
      throw new ApiError({
        status: httpStatus.CONFLICT,
        message: ERROR_MESSAGES.CLIENTE_CUIT_EXISTS,
      });
    }

    const existingCorreo = await clienteRepository.findByCorreo(dto.correo);

    if (existingCorreo) {
      throw new ApiError({
        status: httpStatus.CONFLICT,
        message: ERROR_MESSAGES.CLIENTE_CORREO_EXISTS,
      });
    }

    return clienteRepository.create(dto);
  },

  async findById(id: number) {
    const cliente = await clienteRepository.findById(id);

    if (!cliente) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.CLIENTE_NOT_FOUND,
      });
    }

    return cliente;
  },

  async findByEmpresaId(empresaId: number) {
    return clienteRepository.findByEmpresaId(empresaId);
  },

  async findByStatus(status: ClienteStatus, empresaId: number) {
    return clienteRepository.findByStatus(status, empresaId);
  },

  async update(id: number, dto: UpdateClienteDto) {
    await this.findById(id);

    if (dto.cuit) {
      const existingCuit = await clienteRepository.findByCuit(dto.cuit);

      if (existingCuit && existingCuit.id !== id) {
        throw new ApiError({
          status: httpStatus.CONFLICT,
          message: ERROR_MESSAGES.CLIENTE_CUIT_EXISTS,
        });
      }
    }

    if (dto.correo) {
      const existingCorreo = await clienteRepository.findByCorreo(dto.correo);

      if (existingCorreo && existingCorreo.id !== id) {
        throw new ApiError({
          status: httpStatus.CONFLICT,
          message: ERROR_MESSAGES.CLIENTE_CORREO_EXISTS,
        });
      }
    }

    return clienteRepository.update(id, dto);
  },

  async delete(id: number) {
    await this.findById(id);

    const pedidos = await pedidoRepository.findByClienteId(id);

    if (pedidos.length > 0) {
      throw new ApiError({
        status: httpStatus.CONFLICT,
        message: ERROR_MESSAGES.CLIENTE_HAS_PEDIDOS,
      });
    }

    return clienteRepository.softDelete(id);
  },

  async findAll(search?: string, empresaId?: number) {
    return clienteRepository.findAll(search, empresaId);
  },
};
