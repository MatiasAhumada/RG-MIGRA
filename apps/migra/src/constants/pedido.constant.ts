import { PedidoStatus } from "@prisma/client";
import type { NurtureBarStep } from "@/components/common";

export const PEDIDO_STATUS_LABELS: Record<PedidoStatus, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  DOWNLOADED: "Descargado",
  SHIPPED: "Enviado",
};

export const PEDIDO_STATUS_STYLES: Record<PedidoStatus, string> = {
  PENDING: "bg-[#2b6485]/15 text-[#2b6485]",
  CONFIRMED: "bg-[#7cb56e]/15 text-[#5a9a4e]",
  DOWNLOADED: "bg-[#336366]/20 text-[#4c7c7f]",
  SHIPPED: "bg-[#336366]/20 text-[#4c7c7f]",
};

export const PEDIDO_STATUS_OPTIONS: Array<{
  value: PedidoStatus;
  label: string;
}> = [
  { value: "PENDING", label: "Pendiente" },
  { value: "CONFIRMED", label: "Confirmado" },
  { value: "DOWNLOADED", label: "Descargado" },
  { value: "SHIPPED", label: "Enviado" },
];

export const PEDIDO_NURTURE_STEPS: Record<PedidoStatus, NurtureBarStep[]> = {
  PENDING: [
    { key: "pending", label: "Pendiente", completed: false, current: true },
    { key: "confirmed", label: "Confirmado", completed: false },
    { key: "shipped", label: "Enviado", completed: false },
  ],
  CONFIRMED: [
    { key: "pending", label: "Pendiente", completed: true },
    { key: "confirmed", label: "Confirmado", completed: false, current: true },
    { key: "shipped", label: "Enviado", completed: false },
  ],
  DOWNLOADED: [
    { key: "pending", label: "Pendiente", completed: true },
    { key: "confirmed", label: "Confirmado", completed: true },
    { key: "downloaded", label: "Descargado", completed: false, current: true },
    { key: "shipped", label: "Enviado", completed: false },
  ],
  SHIPPED: [
    { key: "pending", label: "Pendiente", completed: true },
    { key: "confirmed", label: "Confirmado", completed: true },
    { key: "downloaded", label: "Descargado", completed: true },
    { key: "shipped", label: "Enviado", completed: false, current: true },
  ],
};

export const PEDIDO_NURTURE_STEPS_CLIENT: Record<
  PedidoStatus,
  NurtureBarStep[]
> = {
  PENDING: [
    { key: "pending", label: "Pendiente", completed: false, current: true },
    { key: "confirmed", label: "Confirmado", completed: false },
    { key: "shipped", label: "Enviado", completed: false },
  ],
  CONFIRMED: [
    { key: "pending", label: "Pendiente", completed: true },
    { key: "confirmed", label: "Confirmado", completed: false, current: true },
    { key: "shipped", label: "Enviado", completed: false },
  ],
  DOWNLOADED: [
    { key: "pending", label: "Pendiente", completed: true },
    { key: "confirmed", label: "Confirmado", completed: true },
    { key: "shipped", label: "Enviado", completed: false },
  ],
  SHIPPED: [
    { key: "pending", label: "Pendiente", completed: true },
    { key: "confirmed", label: "Confirmado", completed: true },
    { key: "shipped", label: "Enviado", completed: false, current: true },
  ],
};

export const PEDIDO_MESSAGES = {
  UPDATE_SUCCESS: "Estado del pedido actualizado",
  UPDATE_ERROR: "Error al actualizar el estado",
  LOAD_ERROR: "Error al cargar los pedidos",
  DOWNLOAD_SUCCESS: "Orden descargada exitosamente",
  DOWNLOAD_ERROR: "Error al descargar la orden",
  UPLOAD_SUCCESS: "Documento adjuntado y enviado al cliente",
  UPLOAD_ERROR: "Error al adjuntar el documento",
};
