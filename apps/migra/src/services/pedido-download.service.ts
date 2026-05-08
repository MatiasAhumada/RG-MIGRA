import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";

export const pedidoDownloadService = {
  async downloadOrder(pedidoId: number, format: "excel" | "pdf" | "word") {
    const response = await clientAxios.get(
      `${API_ROUTES.PEDIDOS}/${pedidoId}?action=download&format=${format}`,
      { responseType: "blob" },
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    const extension =
      format === "excel" ? "xlsx" : format === "pdf" ? "pdf" : "docx";
    link.setAttribute("download", `pedido-${pedidoId}.${extension}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return response.data;
  },

  async uploadInvoice(pedidoId: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "invoice");

    const response = await clientAxios.patch(
      `${API_ROUTES.PEDIDOS}/${pedidoId}?action=upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  async uploadShippingDocument(pedidoId: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "shipping");

    const response = await clientAxios.patch(
      `${API_ROUTES.PEDIDOS}/${pedidoId}?action=upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },
};
