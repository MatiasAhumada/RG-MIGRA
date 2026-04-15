import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import type {
  ProductoVarianteWithProducto,
  CreateProductoVarianteDto,
  UpdateProductoVarianteDto,
} from "@/types/producto-variante.types";

export const productoVarianteService = {
  async findAll(productoId?: number) {
    const params: Record<string, string> = {};
    if (productoId) params.productoId = String(productoId);

    const { data } = await clientAxios.get<ProductoVarianteWithProducto[]>(
      API_ROUTES.PRODUCTO_VARIANTES,
      { params },
    );
    return data;
  },

  async findById(id: number) {
    const { data } = await clientAxios.get<ProductoVarianteWithProducto>(
      `${API_ROUTES.PRODUCTO_VARIANTES}/${id}`,
    );
    return data;
  },

  async create(dto: CreateProductoVarianteDto) {
    const { data } = await clientAxios.post<ProductoVarianteWithProducto>(
      API_ROUTES.PRODUCTO_VARIANTES,
      dto,
    );
    return data;
  },

  async update(id: number, dto: UpdateProductoVarianteDto) {
    const { data } = await clientAxios.patch<ProductoVarianteWithProducto>(
      `${API_ROUTES.PRODUCTO_VARIANTES}/${id}`,
      dto,
    );
    return data;
  },

  async delete(id: number) {
    const { data } = await clientAxios.delete(
      `${API_ROUTES.PRODUCTO_VARIANTES}/${id}`,
    );
    return data;
  },

  async toggleSinStock(id: number, sinStock: boolean) {
    const { data } = await clientAxios.patch<ProductoVarianteWithProducto>(
      `${API_ROUTES.PRODUCTO_VARIANTES}/${id}`,
      { sinStock },
    );
    return data;
  },
};
