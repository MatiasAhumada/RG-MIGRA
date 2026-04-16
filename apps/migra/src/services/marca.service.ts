import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import type { MarcaWithCategorias } from "@/types/marca.types";

export const marcaService = {
  async findAll(empresaId?: number) {
    const params: Record<string, string> = {};
    if (empresaId) params.empresaId = String(empresaId);

    const { data } = await clientAxios.get<MarcaWithCategorias[]>(
      API_ROUTES.MARCAS,
      {
        params,
      },
    );
    return data;
  },
};
