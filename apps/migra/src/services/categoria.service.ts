import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import type { Categoria } from "@/types/categoria.types";
import type { Subcategoria } from "@/types/subcategoria.types";

interface CategoriaWithSubcategorias extends Categoria {
  subcategorias: Subcategoria[];
}

export const categoriaService = {
  async findAll(empresaId?: number) {
    const params: Record<string, string> = {};
    if (empresaId) params.empresaId = String(empresaId);

    const { data } = await clientAxios.get<CategoriaWithSubcategorias[]>(API_ROUTES.CATEGORIAS, { params });
    return data;
  },
};
