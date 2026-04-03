"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout";
import { PageHeader, NurtureBar } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search01Icon, EyeIcon, FilterIcon } from "hugeicons-react";

const sampleOrders = [
  {
    id: "PED-001",
    cliente: "Baby Store S.R.L",
    items: 12,
    total: 45200,
    status: "CONFIRMED",
    date: "03/04/2026",
  },
  {
    id: "PED-002",
    cliente: "Mundo Bebé",
    items: 8,
    total: 32800,
    status: "PENDING",
    date: "03/04/2026",
  },
  {
    id: "PED-003",
    cliente: "Pequeños Pasos",
    items: 24,
    total: 67500,
    status: "SHIPPED",
    date: "02/04/2026",
  },
  {
    id: "PED-004",
    cliente: "La Casita del Bebé",
    items: 6,
    total: 28900,
    status: "PREPARING",
    date: "02/04/2026",
  },
  {
    id: "PED-005",
    cliente: "Baby Store S.R.L",
    items: 18,
    total: 51300,
    status: "DELIVERED",
    date: "01/04/2026",
  },
  {
    id: "PED-006",
    cliente: "Mundo Bebé",
    items: 3,
    total: 9600,
    status: "CANCELLED",
    date: "31/03/2026",
  },
];

const statusStyles: Record<string, string> = {
  PENDING: "bg-cerulean-900/30 text-cerulean-400",
  CONFIRMED: "bg-honeydew-800/50 text-honeydew-200",
  PREPARING: "bg-frosted-blue-900/30 text-frosted-blue-200",
  SHIPPED: "bg-frosted-blue-900/30 text-frosted-blue-200",
  DELIVERED: "bg-honeydew-800/50 text-honeydew-300",
  CANCELLED: "bg-punch-red-900/30 text-punch-red-400",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  PREPARING: "Preparando",
  SHIPPED: "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

const orderSteps = [
  { key: "pending", label: "Pendiente", completed: true },
  { key: "confirmed", label: "Confirmado", completed: true },
  { key: "preparing", label: "Preparando", completed: false, current: true },
  { key: "shipped", label: "Enviado", completed: false },
  { key: "delivered", label: "Entregado", completed: false },
];

export default function AdminPedidosPage() {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <DashboardLayout variant="admin">
      <PageHeader
        title="Pedidos"
        description="Gestión de pedidos y órdenes de compra"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div className="relative max-w-sm">
          <Search01Icon className="absolute top-3.5 left-4 size-4 text-on-surface-variant/50" />
          <Input
            placeholder="Buscar pedido..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <FilterIcon className="size-4" />
          Filtrar
        </Button>
      </motion.div>

      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-on-surface">
                  Pedido {selectedOrder}
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Seguimiento del pedido
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedOrder(null)}
              >
                Cerrar
              </Button>
            </div>
            <NurtureBar steps={orderSteps} />
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-8"
      >
        <Card className="p-0 overflow-hidden">
          <div className="hidden gap-4 border-b border-outline-variant/10 px-6 py-4 md:grid md:grid-cols-12 text-label-sm text-on-surface-variant">
            <div className="col-span-2">Pedido</div>
            <div className="col-span-3">Cliente</div>
            <div className="col-span-1">Items</div>
            <div className="col-span-2">Total</div>
            <div className="col-span-2">Estado</div>
            <div className="col-span-2 text-right">Acciones</div>
          </div>

          {sampleOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.05 }}
              className="flex flex-col gap-3 border-b border-outline-variant/5 px-6 py-4 transition-colors hover:bg-surface-container/30 last:border-b-0 md:grid md:grid-cols-12 md:items-center md:gap-4"
            >
              <div className="col-span-2">
                <span className="font-mono text-sm font-semibold text-secondary">
                  {order.id}
                </span>
                <p className="text-xs text-on-surface-variant md:hidden">
                  {order.date}
                </p>
              </div>
              <div className="col-span-3">
                <p className="text-sm font-medium text-on-surface">
                  {order.cliente}
                </p>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-on-surface-variant">{order.items}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-semibold text-on-surface">
                  ${order.total.toLocaleString("es-AR")}
                </p>
              </div>
              <div className="col-span-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                >
                  {statusLabels[order.status]}
                </span>
              </div>
              <div className="col-span-2 flex justify-end">
                <Button
                  size="icon-xs"
                  variant="outline"
                  onClick={() => setSelectedOrder(order.id)}
                >
                  <EyeIcon className="size-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
