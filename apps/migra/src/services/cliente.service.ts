import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import {
  CreateClienteDto,
  UpdateClienteDto,
  Cliente,
  ClienteStatus,
} from "@/types/cliente.types";

export const clienteService = {
  async create(dto: CreateClienteDto) {
    const { data } = await clientAxios.post<Cliente>(API_ROUTES.CLIENTES, dto);
    return data;
  },

  async update(id: number, dto: UpdateClienteDto) {
    const { data } = await clientAxios.patch<Cliente>(
      `${API_ROUTES.CLIENTES}/${id}`,
      dto,
    );
    return data;
  },

  async delete(id: number) {
    const { data } = await clientAxios.delete(`${API_ROUTES.CLIENTES}/${id}`);
    return data;
  },

  async findById(id: number) {
    const { data } = await clientAxios.get<Cliente>(
      `${API_ROUTES.CLIENTES}/${id}`,
    );
    return data;
  },

  async findAll(search?: string, empresaId?: number) {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (empresaId) params.empresaId = String(empresaId);

    const { data } = await clientAxios.get<Cliente[]>(API_ROUTES.CLIENTES, {
      params,
    });
    return data;
  },

  async findByEmpresaId(empresaId: number) {
    const { data } = await clientAxios.get<Cliente[]>(API_ROUTES.CLIENTES, {
      params: { empresaId: String(empresaId) },
    });
    return data;
  },

  async findByStatus(status: ClienteStatus, empresaId: number) {
    const { data } = await clientAxios.get<Cliente[]>(API_ROUTES.CLIENTES, {
      params: { status, empresaId: String(empresaId) },
    });
    return data;
  },

  async approve(id: number) {
    const { data } = await clientAxios.patch<Cliente>(
      `${API_ROUTES.CLIENTES}/${id}?action=approve`,
    );
    return data;
  },

  async reject(id: number) {
    const { data } = await clientAxios.patch<Cliente>(
      `${API_ROUTES.CLIENTES}/${id}?action=reject`,
    );
    return data;
  },
};
