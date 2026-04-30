import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";

export const productoVarianteService = {
  async uploadImage(id: number, file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await clientAxios.patch<{ url: string }>(
      `${API_ROUTES.PRODUCTOS}/variantes/${id}`,
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
