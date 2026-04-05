import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import {
  CreateAddressDto,
  UpdateAddressDto,
  Address,
} from "@/types/address.types";

export const addressService = {
  async create(dto: CreateAddressDto) {
    const { data } = await clientAxios.post<Address>(API_ROUTES.ADDRESSES, dto);
    return data;
  },

  async update(id: number, dto: UpdateAddressDto) {
    const { data } = await clientAxios.patch<Address>(
      `${API_ROUTES.ADDRESSES}/${id}`,
      dto,
    );
    return data;
  },

  async delete(id: number) {
    const { data } = await clientAxios.delete(`${API_ROUTES.ADDRESSES}/${id}`);
    return data;
  },

  async findById(id: number) {
    const { data } = await clientAxios.get<Address>(
      `${API_ROUTES.ADDRESSES}/${id}`,
    );
    return data;
  },

  async findAll(clienteId?: number) {
    const params: Record<string, string> = {};
    if (clienteId) params.clienteId = String(clienteId);

    const { data } = await clientAxios.get<Address[]>(API_ROUTES.ADDRESSES, {
      params,
    });
    return data;
  },

  async findByClienteId(clienteId: number) {
    const { data } = await clientAxios.get<Address[]>(API_ROUTES.ADDRESSES, {
      params: { clienteId: String(clienteId) },
    });
    return data;
  },
};
