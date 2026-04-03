"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout";
import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import {
  Package01Icon,
  Group01Icon,
  ShoppingCart01Icon,
  Analytics01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "hugeicons-react";

const stats = [
  {
    label: "Productos Activos",
    value: "248",
    change: "+12%",
    trend: "up" as const,
    icon: Package01Icon,
    color: "bg-secondary-container text-secondary",
  },
  {
    label: "Clientes Registrados",
    value: "86",
    change: "+8%",
    trend: "up" as const,
    icon: Group01Icon,
    color: "bg-honeydew-800/50 text-honeydew-200",
  },
  {
    label: "Pedidos del Mes",
    value: "142",
    change: "+23%",
    trend: "up" as const,
    icon: ShoppingCart01Icon,
    color: "bg-frosted-blue-900/30 text-frosted-blue-200",
  },
  {
    label: "Facturación",
    value: "$2.4M",
    change: "-3%",
    trend: "down" as const,
    icon: Analytics01Icon,
    color: "bg-punch-red-900/30 text-punch-red-400",
  },
];

const recentOrders = [
  {
    id: "PED-001",
    cliente: "Baby Store S.R.L",
    total: "$45.200",
    status: "Confirmado",
    date: "03/04/2026",
  },
  {
    id: "PED-002",
    cliente: "Mundo Bebé",
    total: "$32.800",
    status: "Pendiente",
    date: "03/04/2026",
  },
  {
    id: "PED-003",
    cliente: "Pequeños Pasos",
    total: "$67.500",
    status: "Enviado",
    date: "02/04/2026",
  },
  {
    id: "PED-004",
    cliente: "La Casita del Bebé",
    total: "$28.900",
    status: "Preparando",
    date: "02/04/2026",
  },
  {
    id: "PED-005",
    cliente: "Baby Store S.R.L",
    total: "$51.300",
    status: "Entregado",
    date: "01/04/2026",
  },
];

const statusStyles: Record<string, string> = {
  Confirmado: "bg-honeydew-800/50 text-honeydew-200",
  Pendiente: "bg-cerulean-900/30 text-cerulean-400",
  Enviado: "bg-frosted-blue-900/30 text-frosted-blue-200",
  Preparando: "bg-frosted-blue-900/30 text-frosted-blue-200",
  Entregado: "bg-honeydew-800/50 text-honeydew-300",
};

export default function AdminPage() {
  return (
    <DashboardLayout variant="admin">
      <PageHeader
        title="Panel de Administración"
        description="Resumen general de la operación"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card className="gap-4 p-6">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex size-12 items-center justify-center rounded-2xl ${stat.color}`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" ? "text-honeydew-200" : "text-punch-red-400"}`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUp01Icon className="size-3" />
                    ) : (
                      <ArrowDown01Icon className="size-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-on-surface">
                    {stat.value}
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    {stat.label}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-8"
      >
        <Card className="p-0 overflow-hidden">
          <div className="border-b border-outline-variant/10 p-6">
            <h2 className="text-lg font-bold text-on-surface">
              Pedidos Recientes
            </h2>
          </div>
          <div className="divide-y divide-outline-variant/10">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.05 }}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-surface-container/30"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-semibold text-secondary">
                    {order.id}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-on-surface">
                      {order.cliente}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {order.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-on-surface">
                    {order.total}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
