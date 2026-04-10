"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AppLayout } from "@/components/layout";
import { PageHeader, NurtureBar } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft01Icon } from "hugeicons-react";
import { pedidoService } from "@/services";
import { formatCurrency } from "@/utils/formatters";
import { clientErrorHandler } from "@/utils/handlers/clientHandler";
import type { PedidoWithRelations } from "@/types/pedido.types";
import type { NurtureBarStep } from "@/components/common";

const orderStepsMap: Record<string, NurtureBarStep[]> = {
  PENDING: [
    { key: "pending", label: "Pendiente", completed: false, current: true },
    { key: "confirmed", label: "Confirmado", completed: false },
    { key: "downloaded", label: "Descargado", completed: false },
    { key: "shipped", label: "Enviado", completed: false },
  ],
  CONFIRMED: [
    { key: "pending", label: "Pendiente", completed: true },
    { key: "confirmed", label: "Confirmado", completed: false, current: true },
    { key: "downloaded", label: "Descargado", completed: false },
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

export default function DashboardPedidoPage() {
  const [pedido, setPedido] = useState<PedidoWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPedido();
  }, []);

  const loadPedido = async () => {
    try {
      setIsLoading(true);
      const data = await pedidoService.findById(1);
      setPedido(data);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout variant="client">
        <div className="flex items-center justify-center py-20">
          <span className="size-6 animate-spin rounded-full border-2 border-[#2b6485]/30 border-t-[#2b6485]" />
        </div>
      </AppLayout>
    );
  }

  if (!pedido) {
    return (
      <AppLayout variant="client">
        <div className="py-20 text-center">
          <p className="text-sm text-[#3d4a3d]">No se encontró el pedido</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout variant="client">
      <PageHeader
        title={`Pedido PED-${pedido.id}`}
        description={`Realizado el ${new Date(pedido.fecha).toLocaleDateString("es-AR")}`}
        action={
          <Link href="/dashboard/ordenes">
            <Button variant="outline" size="sm" className="gap-2 rounded-[2rem]">
              <ArrowLeft01Icon className="size-4" />
              Volver a Pedidos
            </Button>
          </Link>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-8"
      >
        <Card className="rounded-[2rem] p-6">
          <h3
            className="mb-4 text-base font-bold text-[#161d16]"
            style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
          >
            Seguimiento del Pedido
          </h3>
          <NurtureBar steps={orderStepsMap[pedido.status] || []} />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="mt-8 grid gap-6 lg:grid-cols-3"
      >
        <div className="lg:col-span-2">
          <Card className="rounded-[2rem] p-0 overflow-hidden">
            <div className="border-b border-[#161d16]/10 px-6 py-4">
              <h3
                className="text-base font-bold text-[#161d16]"
                style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
              >
                Detalle del Pedido
              </h3>
            </div>

            <div className="divide-y divide-[#161d16]/5">
              {pedido.detalles.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <p
                      className="text-sm font-semibold text-[#161d16]"
                      style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                    >
                      {item.producto.name}
                    </p>
                    <p className="text-xs text-[#3d4a3d]">
                      SKU: {item.producto.sku}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-sm text-[#3d4a3d]"
                      style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                    >
                      {item.cantidad} x {formatCurrency(item.producto.price)}
                    </p>
                    <p
                      className="text-sm font-bold text-[#161d16]"
                      style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                    >
                      {formatCurrency(item.total)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-[#161d16]/10 px-6 py-4">
              <div className="flex justify-end">
                <div className="text-right">
                  <p
                    className="text-sm text-[#3d4a3d]"
                    style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                  >
                    Total del Pedido
                  </p>
                  <p
                    className="text-2xl font-bold text-[#b7102a]"
                    style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                  >
                    {formatCurrency(pedido.totalPedido)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="rounded-[2rem] p-6">
            <h3
              className="mb-4 text-base font-bold text-[#161d16]"
              style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
            >
              Dirección de Envío
            </h3>
            <div className="flex flex-col gap-3">
              <div className="rounded-xl bg-[#f3fcf0]/60 p-4">
                <p
                  className="text-sm font-semibold text-[#161d16]"
                  style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                >
                  {pedido.direccion.direccion}
                </p>
                <p
                  className="text-sm text-[#3d4a3d]"
                  style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                >
                  {pedido.direccion.localidad}
                </p>
                <p
                  className="text-sm text-[#3d4a3d]"
                  style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                >
                  {pedido.direccion.provincia}
                </p>
                <p
                  className="text-sm text-[#3d4a3d]"
                  style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                >
                  CP: {pedido.direccion.codPostal}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </AppLayout>
  );
}
