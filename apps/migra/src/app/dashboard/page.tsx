"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout";
import { PageHeader, NurtureBar } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/common";
import {
  ShoppingCart01Icon,
  Clock01Icon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon,
  GridIcon,
  Refresh01Icon,
} from "hugeicons-react";
import Link from "next/link";
import { pedidoService, productoService } from "@/services";
import { formatCurrency } from "@/utils/formatters";
import { clientErrorHandler } from "@/utils/handlers/clientHandler";
import { useDataQuery } from "@/hooks/useDataQuery";
import type { PedidoWithRelations } from "@/types/pedido.types";
import type { ProductoWithRelations } from "@/types/producto.types";
import type { NurtureBarStep } from "@/components/common";

const statusStyles: Record<string, string> = {
  PENDING: "bg-[#2b6485]/15 text-[#2b6485]",
  CONFIRMED: "bg-[#7cb56e]/15 text-[#5a9a4e]",
  DOWNLOADED: "bg-[#336366]/20 text-[#4c7c7f]",
  SHIPPED: "bg-[#336366]/20 text-[#4c7c7f]",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  DOWNLOADED: "Descargado",
  SHIPPED: "Enviado",
};

const orderSteps: NurtureBarStep[] = [
  { key: "pending", label: "Pendiente", completed: true },
  { key: "confirmed", label: "Confirmado", completed: true },
  { key: "downloaded", label: "Descargado", completed: false, current: true },
  { key: "shipped", label: "Enviado", completed: false },
];

export default function DashboardPage() {
  const { data: pedidos, isLoading: pedidosLoading, refetch: refetchPedidos } = useDataQuery<PedidoWithRelations[]>({
    fetcher: () => pedidoService.findAll(),
    refetchInterval: 15000,
  });

  const { data: productos, isLoading: productosLoading } = useDataQuery<ProductoWithRelations[]>({
    fetcher: () => productoService.findAll(),
    refetchInterval: 30000,
  });

  const pedidosList = pedidos || [];
  const productosList = productos || [];
  const isLoading = pedidosLoading || productosLoading;

  const pendingCount = pedidosList.filter((p) => p.status === "PENDING").length;
  const confirmedCount = pedidosList.filter(
    (p) => p.status === "CONFIRMED" || p.status === "DOWNLOADED" || p.status === "SHIPPED",
  ).length;

  return (
    <AppLayout variant="client">
      <PageHeader
        title="Mi Panel"
        description="Bienvenido"
        action={
          <Button
            size="icon-sm"
            variant="ghost"
            className="rounded-full"
            onClick={refetchPedidos}
            disabled={isLoading}
            title="Actualizar ahora"
          >
            <Refresh01Icon className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-8 grid gap-6 sm:grid-cols-3"
      >
        {[
          {
            label: "Pedidos Activos",
            value: confirmedCount.toString(),
            icon: ShoppingCart01Icon,
            color: "bg-[#336366]/20 text-[#4c7c7f]",
          },
          {
            label: "Pendientes",
            value: pendingCount.toString(),
            icon: Clock01Icon,
            color: "bg-[#2b6485]/15 text-[#2b6485]",
          },
          {
            label: "Productos Disponibles",
            value: productosList.length.toString(),
            icon: CheckmarkCircle01Icon,
            color: "bg-[#7cb56e]/15 text-[#5a9a4e]",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card className="rounded-[2rem] gap-4 p-6">
                <div className={`flex size-12 items-center justify-center rounded-2xl ${stat.color}`}>
                  <Icon className="size-6" />
                </div>
                <div>
                  <p
                    className="text-2xl font-bold text-[#161d16]"
                    style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                  >
                    {isLoading ? "..." : stat.value}
                  </p>
                  <p
                    className="text-sm text-[#3d4a3d]"
                    style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                  >
                    {stat.label}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {pedidosList.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mt-8"
        >
          <Card className="rounded-[2rem] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3
                className="text-base font-bold text-[#161d16]"
                style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
              >
                Pedido Reciente - PED-{pedidosList[0].id}
              </h3>
              <Link href="/dashboard/ordenes">
                <Button variant="ghost" size="sm" className="gap-1">
                  Ver todos
                  <ArrowRight01Icon className="size-4" />
                </Button>
              </Link>
            </div>
            <NurtureBar steps={orderSteps} />
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="mt-8"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            className="text-lg font-bold text-[#161d16]"
            style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
          >
            Pedidos Recientes
          </h2>
          <Link href="/dashboard/ordenes">
            <Button variant="ghost" size="sm" className="gap-1">
              Ver historial
              <ArrowRight01Icon className="size-4" />
            </Button>
          </Link>
        </div>

        <Card className="rounded-[2rem] p-0 overflow-hidden">
          {pedidosList.slice(0, 5).map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="flex items-center justify-between border-b border-[#161d16]/5 px-6 py-4 transition-colors hover:bg-[#f3fcf0]/30 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm font-semibold text-[#2b6485]">
                  PED-{order.id}
                </span>
                <div>
                  <p
                    className="text-sm text-[#161d16]"
                    style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                  >
                    {order.detalles.length} items
                  </p>
                  <p className="text-xs text-[#3d4a3d]">
                    {new Date(order.fecha).toLocaleDateString("es-AR")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className="text-sm font-semibold text-[#161d16]"
                  style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                >
                  {formatCurrency(order.totalPedido)}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                >
                  {statusLabels[order.status]}
                </span>
              </div>
            </motion.div>
          ))}

          {pedidosList.length === 0 && !isLoading && (
            <div className="py-12 text-center">
              <p className="text-sm text-[#3d4a3d]">
                No tenés pedidos todavía
              </p>
            </div>
          )}
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-12 mb-8"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            className="text-lg font-bold text-[#161d16]"
            style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
          >
            Productos Sugeridos
          </h2>
          <Link href="/catalogo">
            <Button variant="ghost" size="sm" className="gap-2">
              <GridIcon className="size-4" />
              Ver catálogo
            </Button>
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productosList.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              tipo={product.categoria.name}
              sku={product.sku}
              price={product.price}
              imgUrl={product.imgUrl || ""}
            />
          ))}
        </div>
      </motion.div>
    </AppLayout>
  );
}
