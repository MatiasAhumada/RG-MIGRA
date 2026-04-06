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
  PENDING: "text-vanilla-cream-200/15 text-vanilla-cream-300",
  CONFIRMED: "bg-hunter-green/10 text-hunter-green",
  DELIVERED: "bg-hunter-green/10 text-hunter-green",
  CANCELLED: "bg-error/10 text-error",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

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
          <div className="hidden gap-4 border-b border-border/10 px-6 py-4 md:grid md:grid-cols-12 text-xs font-medium uppercase tracking-wider text-muted-foreground">
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
              transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
              className="flex flex-col gap-3 border-b border-border/5 px-6 py-4 transition-colors hover:bg-vanilla-cream-600/30 last:border-b-0 md:grid md:grid-cols-12 md:items-center md:gap-4"
            >
              <div className="col-span-2">
                <span className="font-mono text-sm font-semibold text-hunter-green">
                  {order.id}
                </span>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-foreground">{order.items} items</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-semibold text-foreground">
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
