import { addressRepository } from "@/server/repository/address.repository";
import { clienteRepository } from "@/server/repository/cliente.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";
import { CreateAddressDto, UpdateAddressDto } from "@/types/address.types";

export const addressService = {
  async create(dto: CreateAddressDto) {
    const cliente = await clienteRepository.findById(dto.clienteId);

    if (!cliente) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.CLIENTE_NOT_FOUND,
      });
    }

    return addressRepository.create(dto);
  },

  async findById(id: number) {
    const address = await addressRepository.findById(id);

    if (!address) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ADDRESS_NOT_FOUND,
      });
    }

    return address;
  },

  async findByClienteId(clienteId: number) {
    const cliente = await clienteRepository.findById(clienteId);

    if (!cliente) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.CLIENTE_NOT_FOUND,
      });
    }

    return addressRepository.findByClienteId(clienteId);
  },

  async update(id: number, dto: UpdateAddressDto) {
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

    return addressRepository.update(id, dto);
  },

  async delete(id: number) {
    await this.findById(id);

    return addressRepository.softDelete(id);
  },

  async findAll(clienteId?: number) {
    return addressRepository.findAll(clienteId);
  },
};
