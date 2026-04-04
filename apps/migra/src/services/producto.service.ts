import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import {
  CreateProductoDto,
  UpdateProductoDto,
  Producto,
} from "@/types/producto.types";

export const productoService = {
  async create(dto: CreateProductoDto) {
    const { data } = await clientAxios.post<Producto>(
      API_ROUTES.PRODUCTOS,
      dto,
    );
    return data;
  },

  async update(id: number, dto: UpdateProductoDto) {
    const { data } = await clientAxios.patch<Producto>(
      `${API_ROUTES.PRODUCTOS}/${id}`,
      dto,
    );
    return data;
  },

  async delete(id: number) {
    const { data } = await clientAxios.delete(`${API_ROUTES.PRODUCTOS}/${id}`);
    return data;
  },

  async findById(id: number) {
    const { data } = await clientAxios.get<Producto>(
      `${API_ROUTES.PRODUCTOS}/${id}`,
    );
    return data;
  },

  async findAll(search?: string, empresaId?: number) {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (empresaId) params.empresaId = String(empresaId);

    const { data } = await clientAxios.get<Producto[]>(API_ROUTES.PRODUCTOS, {
      params,
    });
    return data;
  },

  async findByEmpresaId(empresaId: number) {
    const { data } = await clientAxios.get<Producto[]>(API_ROUTES.PRODUCTOS, {
      params: { empresaId: String(empresaId) },
    });
    return data;
  },

  async findByTipo(tipo: string, empresaId: number) {
    const { data } = await clientAxios.get<Producto[]>(API_ROUTES.PRODUCTOS, {
      params: { tipo, empresaId: String(empresaId) },
    });
    return data;
  },
};
