import { clienteRepository } from "@/server/repository/cliente.repository";
import { userRepository } from "@/server/repository/user.repository";
import { pedidoRepository } from "@/server/repository/pedido.repository";
import { emailService } from "@/server/services/email.service";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import {
  CreateClienteDto,
  UpdateClienteDto,
  ClienteStatus,
} from "@/types/cliente.types";

export const clienteService = {
  async create(dto: CreateClienteDto) {
    const existingCuit = await clienteRepository.findByCuit(dto.cuit);

    if (existingCuit) {
      if (
        existingCuit.status === "PENDING" ||
        existingCuit.status === "APPROVED"
      ) {
        throw new ApiError({
          status: httpStatus.CONFLICT,
          message: ERROR_MESSAGES.CLIENTE_CUIT_EXISTS,
        });
      }

      return clienteRepository.update(existingCuit.id, {
        ...dto,
        status: "PENDING",
        userId: null,
      });
    }

    const existingCorreo = await clienteRepository.findByCorreo(dto.correo);

    if (existingCorreo) {
      if (
        existingCorreo.status === "PENDING" ||
        existingCorreo.status === "APPROVED"
      ) {
        throw new ApiError({
          status: httpStatus.CONFLICT,
          message: ERROR_MESSAGES.CLIENTE_CORREO_EXISTS,
        });
      }

      return clienteRepository.update(existingCorreo.id, {
        ...dto,
        status: "PENDING",
        userId: null,
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

  async approve(id: number) {
    const cliente = await this.findById(id);

    if (cliente.status !== "PENDING") {
      throw new ApiError({
        status: httpStatus.BAD_REQUEST,
        message: "El cliente ya fue procesado",
      });
    }

    if (cliente.userId) {
      return clienteRepository.update(id, { status: "APPROVED" });
    }

    const existingUser = await userRepository.findByEmail(cliente.correo);

    if (existingUser) {
      await clienteRepository.update(id, {
        status: "APPROVED",
        userId: existingUser.id,
      });
      return clienteRepository.findById(id);
    }

    const tempPassword = this.generatePassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = await userRepository.create({
      email: cliente.correo,
      password: hashedPassword,
      name: cliente.titular,
      role: "CLIENT",
      empresaId: cliente.empresaId,
      mustChangePassword: true,
    });

    await clienteRepository.update(id, {
      status: "APPROVED",
      userId: user.id,
    });

    await emailService.sendClientCredentials(
      cliente.correo,
      cliente.razonSocial,
      cliente.correo,
      tempPassword,
    );

    return clienteRepository.findById(id);
  },

  async reject(id: number) {
    const cliente = await this.findById(id);

    if (cliente.status !== "PENDING") {
      throw new ApiError({
        status: httpStatus.BAD_REQUEST,
        message: "El cliente ya fue procesado",
      });
    }

    return clienteRepository.update(id, { status: "REJECTED" });
  },

  generatePassword(): string {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  },
};
