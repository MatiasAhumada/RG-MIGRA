"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AppLayout } from "@/components/layout";
import { PageHeader, NurtureBar } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft01Icon, EyeIcon } from "hugeicons-react";

const allOrders = [
  {
    id: "PED-001",
    items: 12,
    total: 45200,
    status: "CONFIRMED",
    date: "03/04/2026",
  },
  {
    id: "PED-002",
    items: 8,
    total: 32800,
    status: "PENDING",
    date: "01/04/2026",
  },
  {
    id: "PED-003",
    items: 24,
    total: 67500,
    status: "DELIVERED",
    date: "28/03/2026",
  },
  {
    id: "PED-004",
    items: 5,
    total: 16000,
    status: "DELIVERED",
    date: "20/03/2026",
  },
  {
    id: "PED-005",
    items: 15,
    total: 42300,
    status: "DELIVERED",
    date: "15/03/2026",
  },
  {
    id: "PED-006",
    items: 3,
    total: 9600,
    status: "CANCELLED",
    date: "10/03/2026",
  },
];

const statusStyles: Record<string, string> = {
  PENDING: "bg-cerulean-500/15 text-cerulean-600",
  CONFIRMED: "bg-honeydew-500/15 text-honeydew-200",
  DELIVERED: "bg-honeydew-500/15 text-honeydew-300",
  CANCELLED: "bg-punch-red-500/15 text-punch-red-400",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

const orderSteps = [
  { key: "pending", label: "Pendiente", completed: true },
  { key: "confirmed", label: "Confirmado", completed: true },
  { key: "preparing", label: "Preparando", completed: true },
  { key: "shipped", label: "Enviado", completed: true },
  { key: "delivered", label: "Entregado", completed: true },
];

export default function DashboardOrdenesPage() {
  return (
    <AppLayout variant="client">
      <PageHeader
        title="Mis Pedidos"
        description="Historial completo de pedidos"
        action={
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft01Icon className="size-4" />
              Volver al Panel
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
        <Card className="p-0 overflow-hidden">
          <div className="hidden gap-4 border-b border-outline-variant/10 px-6 py-4 md:grid md:grid-cols-12 text-label-sm text-on-surface-variant">
            <div className="col-span-2">Pedido</div>
            <div className="col-span-2">Fecha</div>
            <div className="col-span-2">Items</div>
            <div className="col-span-2">Total</div>
            <div className="col-span-2">Estado</div>
            <div className="col-span-2 text-right">Acciones</div>
          </div>

          {allOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="flex flex-col gap-3 border-b border-outline-variant/5 px-6 py-4 transition-colors hover:bg-surface-container/30 last:border-b-0 md:grid md:grid-cols-12 md:items-center md:gap-4"
            >
              <div className="col-span-2">
                <span className="font-mono text-sm font-semibold text-cerulean-500">
                  {order.id}
                </span>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-on-surface-variant">{order.date}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-on-surface">{order.items} items</p>
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
                <Button size="icon-xs" variant="outline">
                  <EyeIcon className="size-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </Card>
      </motion.div>
    </AppLayout>
  );
}
