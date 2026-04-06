"use client";

import { AppLayout } from "@/components/layout";
import { PageHeader } from "@/components/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package01Icon,
  Group01Icon,
  ShoppingCart01Icon,
  Analytics01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "hugeicons-react";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Productos Activos",
    value: "248",
    trend: "+12%",
    direction: "up" as const,
    icon: Package01Icon,
    color: "bg-sage-green-800 text-sage-green-400",
    border: "border-t-sage-green",
  },
  {
    label: "Clientes Registrados",
    value: "86",
    trend: "+8%",
    direction: "up" as const,
    icon: Group01Icon,
    color: "bg-accent-warm-light text-vanilla-cream-300",
    border: "border-t-vanilla-cream-300",
  },
  {
    label: "Pedidos del Mes",
    value: "142",
    trend: "+23%",
    direction: "up" as const,
    icon: ShoppingCart01Icon,
    color: "bg-hunter-green/10 text-hunter-green",
    border: "border-t-primary",
  },
  {
    label: "Facturacion",
    value: "$2.4M",
    trend: "-3%",
    direction: "down" as const,
    icon: Analytics01Icon,
    color: "bg-error/10 text-error",
    border: "border-t-blushed-brick",
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    client: "Maria Garcia",
    product: "Pack Premium",
    amount: "$1,250.00",
    status: "confirmado",
    date: "2026-04-04",
  },
  {
    id: "ORD-002",
    client: "Carlos Lopez",
    product: "Catalogo Basico",
    amount: "$480.00",
    status: "pendiente",
    date: "2026-04-03",
  },
  {
    id: "ORD-003",
    client: "Ana Martinez",
    product: "Pack Empresarial",
    amount: "$2,100.00",
    status: "enviado",
    date: "2026-04-02",
  },
  {
    id: "ORD-004",
    client: "Roberto Sanchez",
    product: "Pack Starter",
    amount: "$350.00",
    status: "preparando",
    date: "2026-04-01",
  },
  {
    id: "ORD-005",
    client: "Laura Fernandez",
    product: "Catalogo Avanzado",
    amount: "$890.00",
    status: "confirmado",
    date: "2026-03-31",
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  confirmado: {
    label: "Confirmado",
    className: "bg-hunter-green/10 text-hunter-green",
  },
  pendiente: {
    label: "Pendiente",
    className: "text-vanilla-cream-200/15 text-vanilla-cream-300",
  },
  enviado: {
    label: "Enviado",
    className: "bg-sage-green-800 text-sage-green-400",
  },
  preparando: {
    label: "Preparando",
    className: "bg-sage-green-800 text-sage-green-400",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function AdminDashboardPage() {
  return (
    <AppLayout variant="admin">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Dashboard"
          description="Bienvenido de vuelta. Aqui tienes un resumen de tu negocio."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} variants={itemVariants}>
                <Card
                  elevation="elevated"
                  className={`rounded-2xl border-t-4 ${stat.border}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex items-center gap-1">
                        {stat.direction === "up" ? (
                          <ArrowUp01Icon className="h-4 w-4 text-hunter-green" />
                        ) : (
                          <ArrowDown01Icon className="h-4 w-4 text-error" />
                        )}
                        <span
                          className={`text-sm font-medium ${stat.direction === "up" ? "text-hunter-green" : "text-error"}`}
                        >
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-foreground [-0.02em]">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Card elevation="elevated" className="rounded-2xl">
            <CardHeader>
              <CardTitle>Pedidos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        ID
                      </th>
                      <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Cliente
                      </th>
                      <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Producto
                      </th>
                      <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Monto
                      </th>
                      <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Estado
                      </th>
                      <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Fecha
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {recentOrders.map((order) => {
                      const status = statusConfig[order.status];
                      return (
                        <tr
                          key={order.id}
                          className="transition-colors hover:bg-vanilla-cream-700"
                        >
                          <td className="py-4 text-sm font-medium text-foreground">
                            {order.id}
                          </td>
                          <td className="py-4 text-sm text-muted-foreground">
                            {order.client}
                          </td>
                          <td className="py-4 text-sm text-muted-foreground">
                            {order.product}
                          </td>
                          <td className="py-4 text-sm font-medium text-foreground">
                            {order.amount}
                          </td>
                          <td className="py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                            >
                              {status.label}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-muted-foreground">
                            {order.date}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
}
