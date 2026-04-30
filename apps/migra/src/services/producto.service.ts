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

  async findAllActive(
    search?: string,
    empresaId?: number,
    categoriaId?: number,
  ) {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (empresaId) params.empresaId = String(empresaId);
    if (categoriaId) params.categoriaId = String(categoriaId);

    const { data } = await clientAxios.get<ProductoWithRelations[]>(
      API_ROUTES.PRODUCTOS,
      {
        params,
      },
    );
    return data;
  },

  async findAll(search?: string, empresaId?: number, categoriaId?: number) {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (empresaId) params.empresaId = String(empresaId);
    if (categoriaId) params.categoriaId = String(categoriaId);

    const { data } = await clientAxios.get<ProductoWithRelations[]>(
      API_ROUTES.PRODUCTOS,
      {
        params,
      },
    );
    return data;
  },

  async findAllWithDeleted(
    search?: string,
    empresaId?: number,
    marcaId?: number,
    categoriaId?: number,
    subcategoriaId?: number,
    page?: number,
    limit?: number,
  ) {
    const params: Record<string, string> = { includeDeleted: "true" };
    if (search) params.search = search;
    if (empresaId) params.empresaId = String(empresaId);
    if (marcaId) params.marcaId = String(marcaId);
    if (categoriaId) params.categoriaId = String(categoriaId);
    if (subcategoriaId) params.subcategoriaId = String(subcategoriaId);
    if (page) params.page = String(page);
    if (limit) params.limit = String(limit);

    const { data } = await clientAxios.get<{
      data: ProductoWithRelations[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(API_ROUTES.PRODUCTOS, {
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
        timeout: 120000,
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
        timeout: 120000,
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

  async bulkUploadImages(files: File[]) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    const { data } = await clientAxios.post<{
      success: number;
      failed: number;
      results: {
        sku: string;
        success: boolean;
        url?: string;
        error?: string;
      }[];
    }>(`${API_ROUTES.PRODUCTOS}/bulk-upload-images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 300000,
    });
    return data;
  },

  async uploadImage(id: number, file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await clientAxios.patch<{ url: string }>(
      `${API_ROUTES.PRODUCTOS}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data.url;
  },
};
