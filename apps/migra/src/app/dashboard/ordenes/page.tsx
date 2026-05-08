"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AppLayout } from "@/components/layout";
import { PageHeader, NurtureBar, DataTable } from "@/components/common";
import { Button } from "@/components/ui/button";
import { GenericModal } from "@/components/common";
import { ArrowLeft01Icon, EyeIcon, Refresh01Icon } from "hugeicons-react";
import { pedidoService } from "@/services";
import { formatCurrency } from "@/utils/formatters";
import { useDataQuery } from "@/hooks/useDataQuery";
import type { PedidoWithRelations } from "@/types/pedido.types";
import {
  PEDIDO_STATUS_LABELS,
  PEDIDO_STATUS_STYLES,
  PEDIDO_NURTURE_STEPS_CLIENT,
} from "@/constants/pedido.constant";

export default function DashboardOrdenesPage() {
  const [selectedPedido, setSelectedPedido] =
    useState<PedidoWithRelations | null>(null);

  const {
    data: pedidos,
    isLoading,
    refetch,
  } = useDataQuery<PedidoWithRelations[]>({
    fetcher: () => pedidoService.findAll(),
  });

  return (
    <AppLayout variant="client">
      <PageHeader
        title="Mis Pedidos"
        description="Historial completo de pedidos"
        action={
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-full"
              onClick={refetch}
              disabled={isLoading}
              title="Actualizar ahora"
            >
              <Refresh01Icon
                className={`size-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-[2rem]"
              >
                <ArrowLeft01Icon className="size-4" />
                Volver al Panel
              </Button>
            </Link>
          </div>
        }
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
              key: "fecha",
              label: "Fecha",
              render: (item) => (
                <p className="text-sm text-[#3d4a3d]">
                  {new Date(item.fecha).toLocaleDateString("es-AR")}
                </p>
              ),
            },
            {
              key: "items",
              label: "Items",
              render: (item) => (
                <p className="text-sm text-[#161d16]">
                  {item.detalles.length} items
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
                <Button
                  size="icon-xs"
                  variant="outline"
                  onClick={() => setSelectedPedido(item)}
                  title="Ver detalle"
                >
                  <EyeIcon className="size-3" />
                </Button>
              ),
            },
          ]}
          data={isLoading ? [] : pedidos || []}
          keyExtractor={(item) => String(item.id)}
          emptyMessage="No hay pedidos en el historial"
          totalLabel={`${(pedidos || []).length} pedidos`}
        />
      </motion.div>

      <GenericModal
        open={!!selectedPedido}
        onOpenChange={() => setSelectedPedido(null)}
        title={`Pedido PED-${selectedPedido?.id}`}
        description={`Detalle del pedido realizado el ${selectedPedido ? new Date(selectedPedido.fecha).toLocaleDateString("es-AR") : ""}`}
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
                steps={PEDIDO_NURTURE_STEPS_CLIENT[selectedPedido.status] || []}
              />
            </div>

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
                <p className="text-sm text-[#3d4a3d]">Estado</p>
                <span
                  className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium ${PEDIDO_STATUS_STYLES[selectedPedido.status]}`}
                >
                  {PEDIDO_STATUS_LABELS[selectedPedido.status]}
                </span>
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
