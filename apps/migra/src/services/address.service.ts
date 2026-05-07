import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import type { Address, CreateAddressDto } from "@/types/address.types";

export const addressService = {
  async create(dto: CreateAddressDto) {
    const { data } = await clientAxios.post<Address>(API_ROUTES.ADDRESSES, dto);
    return data;
  },

  async findByClienteId(clienteId: number) {
    const { data } = await clientAxios.get<Address[]>(API_ROUTES.ADDRESSES, {
      params: { clienteId: String(clienteId) },
    });
    return data;
  },
};
