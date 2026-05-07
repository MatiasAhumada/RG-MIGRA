import { addressRepository } from "@/server/repository/address.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";
import type { CreateAddressDto, UpdateAddressDto } from "@/types/address.types";

export const addressService = {
  async create(dto: CreateAddressDto) {
    return addressRepository.create(dto);
  },

  async findById(id: number) {
    const address = await addressRepository.findById(id);

    if (!address) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: "Dirección no encontrada",
      });
    }

    return address;
  },

  async findByClienteId(clienteId: number) {
    return addressRepository.findByClienteId(clienteId);
  },

  async update(id: number, dto: UpdateAddressDto) {
    await this.findById(id);
    return addressRepository.update(id, dto);
  },

  async delete(id: number) {
    await this.findById(id);
    return addressRepository.softDelete(id);
  },
};
