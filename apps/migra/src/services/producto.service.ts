import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import {
  CreateProductoDto,
  UpdateProductoDto,
  Producto,
  ProductoWithRelations,
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

  async updateImage(id: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await clientAxios.patch<Producto>(
      `${API_ROUTES.PRODUCTOS}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data;
  },

  async delete(id: number) {
    const { data } = await clientAxios.delete(`${API_ROUTES.PRODUCTOS}/${id}`);
    return data;
  },

  async findById(id: number) {
    const { data } = await clientAxios.get<ProductoWithRelations>(
      `${API_ROUTES.PRODUCTOS}/${id}`,
    );
    return data;
  },

  async findAll(search?: string, empresaId?: number) {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (empresaId) params.empresaId = String(empresaId);

    const { data } = await clientAxios.get<ProductoWithRelations[]>(
      API_ROUTES.PRODUCTOS,
      {
        params,
      },
    );
    return data;
  },

  async findAllWithDeleted(search?: string, empresaId?: number) {
    const params: Record<string, string> = { includeDeleted: "true" };
    if (search) params.search = search;
    if (empresaId) params.empresaId = String(empresaId);

    const { data } = await clientAxios.get<ProductoWithRelations[]>(
      API_ROUTES.PRODUCTOS,
      {
        params,
      },
    );
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

  async bulkCreateFromPdf(
    file: File,
    tipo: string,
    defaultPrice: number,
    empresaId: number,
  ) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tipo", tipo);
    formData.append("defaultPrice", String(defaultPrice));
    formData.append("empresaId", String(empresaId));

    const { data } = await clientAxios.post(
      `${API_ROUTES.PRODUCTOS}?bulk=true`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data;
  },

  async bulkCreateFromExcel(file: File, empresaId: number) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("empresaId", String(empresaId));

    const { data } = await clientAxios.post(
      `${API_ROUTES.PRODUCTOS}?bulk=true`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000,
      },
    );
    return data;
  },

  async toggleSinStock(id: number, sinStock: boolean) {
    const { data } = await clientAxios.patch<Producto>(
      `${API_ROUTES.PRODUCTOS}/${id}`,
      { sinStock },
    );
    return data;
  },

  async restore(id: number) {
    const { data } = await clientAxios.patch<Producto>(
      `${API_ROUTES.PRODUCTOS}/${id}`,
      { action: "restore" },
    );
    return data;
  },
};
