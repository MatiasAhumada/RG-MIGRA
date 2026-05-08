"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout";
import { PageHeader, NurtureBar, DataTable } from "@/components/common";
import { Button } from "@/components/ui/button";
import { GenericModal } from "@/components/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EyeIcon,
  FilterIcon,
  Refresh01Icon,
  Download02Icon,
  AttachmentIcon,
} from "hugeicons-react";
import { pedidoService } from "@/services";
import { pedidoDownloadService } from "@/services/pedido-download.service";
import { formatCurrency } from "@/utils/formatters";
import {
  clientErrorHandler,
  clientSuccessHandler,
} from "@/utils/handlers/clientHandler";
import { useDataQuery } from "@/hooks/useDataQuery";
import type { PedidoWithRelations } from "@/types/pedido.types";
import type { PedidoStatus } from "@prisma/client";
import {
  PEDIDO_STATUS_LABELS,
  PEDIDO_STATUS_STYLES,
  PEDIDO_NURTURE_STEPS,
  PEDIDO_STATUS_OPTIONS,
  PEDIDO_MESSAGES,
} from "@/constants/pedido.constant";

export default function AdminPedidosPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedPedido, setSelectedPedido] =
    useState<PedidoWithRelations | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const {
    data: pedidos,
    isLoading,
    refetch,
  } = useDataQuery<PedidoWithRelations[]>({
    fetcher: () => pedidoService.findAll(),
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    const timeout = setTimeout(() => {
      setDebouncedSearch(value);
    }, 500);

    return () => clearTimeout(timeout);
  };

  const handleStatusChange = async (status: PedidoStatus) => {
    if (!selectedPedido) return;

    setIsUpdating(true);
    try {
      await pedidoService.updateStatus(selectedPedido.id, status);
      clientSuccessHandler(PEDIDO_MESSAGES.UPDATE_SUCCESS);
      await refetch();
      setSelectedPedido({ ...selectedPedido, status });
    } catch (error) {
      clientErrorHandler(error, undefined, {
        messagePrefix: PEDIDO_MESSAGES.UPDATE_ERROR,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDownload = async (format: "excel" | "pdf" | "word") => {
    if (!selectedPedido) return;

    setIsDownloading(true);
    try {
      await pedidoDownloadService.downloadOrder(selectedPedido.id, format);
      clientSuccessHandler(PEDIDO_MESSAGES.DOWNLOAD_SUCCESS);
    } catch (error) {
      clientErrorHandler(error, undefined, {
        messagePrefix: PEDIDO_MESSAGES.DOWNLOAD_ERROR,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleUploadInvoice = async () => {
    if (!selectedPedido) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setIsUploading(true);
      try {
        await pedidoDownloadService.uploadInvoice(selectedPedido.id, file);
        clientSuccessHandler(PEDIDO_MESSAGES.UPLOAD_SUCCESS);
      } catch (error) {
        clientErrorHandler(error, undefined, {
          messagePrefix: PEDIDO_MESSAGES.UPLOAD_ERROR,
        });
      } finally {
        setIsUploading(false);
      }
    };
    input.click();
  };

  const handleUploadShipping = async () => {
    if (!selectedPedido) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setIsUploading(true);
      try {
        await pedidoDownloadService.uploadShippingDocument(
          selectedPedido.id,
          file,
        );
        clientSuccessHandler(PEDIDO_MESSAGES.UPLOAD_SUCCESS);
      } catch (error) {
        clientErrorHandler(error, undefined, {
          messagePrefix: PEDIDO_MESSAGES.UPLOAD_ERROR,
        });
      } finally {
        setIsUploading(false);
      }
    };
    input.click();
  };

  const filteredOrders = (pedidos || []).filter(
    (o) =>
      o.id.toString().toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      o.cliente.razonSocial
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()),
  );

  return (
    <AppLayout variant="admin">
      <PageHeader
        title="Pedidos"
        description="Gestión de pedidos y órdenes de compra"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-8"
      >
        <DataTable<PedidoWithRelations>
          title=""
          subtitle=""
          columns={[
            {
              key: "id",
              label: "Pedido",
              render: (item) => (
                <span className="font-mono text-sm font-semibold text-[#2b6485]">
                  PED-{item.id}
                </span>
              ),
            },
            {
              key: "cliente",
              label: "Cliente",
              render: (item) => (
                <p className="text-sm font-medium text-[#161d16]">
                  {item.cliente.razonSocial}
                </p>
              ),
            },
            {
              key: "fecha",
              label: "Fecha",
              render: (item) => (
                <p className="text-sm text-[#3d4a3d]">
                  {new Date(item.fecha).toLocaleDateString("es-AR")}
                </p>
              ),
            },
            {
              key: "totalPedido",
              label: "Total",
              render: (item) => (
                <p
                  className="text-sm font-semibold text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {formatCurrency(item.totalPedido)}
                </p>
              ),
            },
            {
              key: "status",
              label: "Estado",
              render: (item) => (
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${PEDIDO_STATUS_STYLES[item.status]}`}
                >
                  {PEDIDO_STATUS_LABELS[item.status]}
                </span>
              ),
            },
            {
              key: "actions",
              label: "Acciones",
              render: (item) => (
                <div className="flex items-center gap-2">
                  <Button
                    size="icon-xs"
                    variant="outline"
                    onClick={() => setSelectedPedido(item)}
                    title="Ver detalle"
                  >
                    <EyeIcon className="size-3" />
                  </Button>
                </div>
              ),
            },
          ]}
          data={isLoading ? [] : filteredOrders}
          keyExtractor={(item) => String(item.id)}
          emptyMessage="No se encontraron pedidos"
          searchPlaceholder="Buscar pedido..."
          onSearch={handleSearchChange}
          actions={
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-[2rem]"
              >
                <FilterIcon className="size-4" />
                Filtrar
              </Button>
              <Button
                size="icon-sm"
                variant="ghost"
                className="rounded-full"
                onClick={refetch}
                disabled={isLoading}
                title="Actualizar ahora"
              >
                <Refresh01Icon
                  className={`size-4 ${isLoading ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          }
          totalLabel={`${filteredOrders.length} pedidos`}
        />
      </motion.div>

      <GenericModal
        open={!!selectedPedido}
        onOpenChange={() => setSelectedPedido(null)}
        title={`Pedido PED-${selectedPedido?.id}`}
        description={`Detalle y seguimiento del pedido`}
        size="xl"
      >
        {selectedPedido && (
          <div className="flex flex-col gap-6">
            <div>
              <h3
                className="mb-3 text-sm font-bold text-[#161d16]"
                style={{
                  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                }}
              >
                Seguimiento
              </h3>
              <NurtureBar
                steps={PEDIDO_NURTURE_STEPS[selectedPedido.status] || []}
              />
            </div>

            <div>
              <h3
                className="mb-3 text-sm font-bold text-[#161d16]"
                style={{
                  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                }}
              >
                Cambiar Estado
              </h3>
              <Select
                value={selectedPedido.status}
                onValueChange={(value) =>
                  handleStatusChange(value as PedidoStatus)
                }
                disabled={isUpdating}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PEDIDO_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPedido.status === "DOWNLOADED" && (
              <div>
                <h3
                  className="mb-3 text-sm font-bold text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  Descargar Orden
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleDownload("excel")}
                    disabled={isDownloading}
                  >
                    <Download02Icon className="size-4" />
                    Excel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleDownload("pdf")}
                    disabled={isDownloading}
                  >
                    <Download02Icon className="size-4" />
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleDownload("word")}
                    disabled={isDownloading}
                  >
                    <Download02Icon className="size-4" />
                    Word
                  </Button>
                </div>
              </div>
            )}

            {selectedPedido.status === "SHIPPED" && (
              <div>
                <h3
                  className="mb-3 text-sm font-bold text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  Adjuntar Documentos
                </h3>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={handleUploadInvoice}
                    disabled={isUploading}
                  >
                    <AttachmentIcon className="size-4" />
                    Adjuntar Factura
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={handleUploadShipping}
                    disabled={isUploading}
                  >
                    <AttachmentIcon className="size-4" />
                    Adjuntar Documentación de Envío
                  </Button>
                </div>
              </div>
            )}

            <div>
              <h3
                className="mb-3 text-sm font-bold text-[#161d16]"
                style={{
                  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                }}
              >
                Items del Pedido
              </h3>
              <div className="divide-y divide-[#161d16]/5 rounded-xl border border-[#161d16]/5">
                {selectedPedido.detalles.map((detalle) => (
                  <div
                    key={detalle.id}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <div>
                      <p
                        className="text-sm font-semibold text-[#161d16]"
                        style={{
                          fontFamily:
                            "'Manrope', 'Inter', system-ui, sans-serif",
                        }}
                      >
                        {detalle.producto.name}
                      </p>
                      <p className="text-xs text-[#3d4a3d]">
                        SKU: {detalle.producto.sku}
                        {detalle.color && ` • ${detalle.color}`}
                        {detalle.talle && ` • Talle ${detalle.talle}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#3d4a3d]">
                        {detalle.cantidad} x{" "}
                        {formatCurrency(detalle.producto.price)}
                      </p>
                      <p
                        className="text-sm font-bold text-[#161d16]"
                        style={{
                          fontFamily:
                            "'Manrope', 'Inter', system-ui, sans-serif",
                        }}
                      >
                        {formatCurrency(detalle.total)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#f3fcf0]/60 p-4">
              <div>
                <p className="text-sm text-[#3d4a3d]">Cliente</p>
                <p
                  className="text-sm font-semibold text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {selectedPedido.cliente.razonSocial}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#3d4a3d]">Total</p>
                <p
                  className="text-xl font-bold text-[#b7102a]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {formatCurrency(selectedPedido.totalPedido)}
                </p>
              </div>
            </div>
          </div>
        )}
      </GenericModal>
    </AppLayout>
  );
}
