"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
} from "hugeicons-react";

const recentOrders = [
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
];

const statusStyles: Record<string, string> = {
  PENDING: "bg-cerulean-500/15 text-cerulean-600",
  CONFIRMED: "bg-honeydew-500/15 text-honeydew-200",
  DELIVERED: "bg-honeydew-500/15 text-honeydew-300",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  DELIVERED: "Entregado",
};

const suggestedProducts = [
  {
    id: 1,
    name: "Pack Pañales Premium Talle M",
    tipo: "Pañales",
    sku: "PAN-PRE-M",
    price: 15800,
    imgUrl:
      "https://images.unsplash.com/photo-1594125345722-e6e726a33a79?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Toallitas Húmedas x100",
    tipo: "Higiene",
    sku: "TOH-100",
    price: 4200,
    imgUrl:
      "https://images.unsplash.com/photo-1627916560298-0227d0754b40?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Leche Infantil Fórmula 900g",
    tipo: "Alimentación",
    sku: "LEI-FOR-900",
    price: 12500,
    imgUrl:
      "https://images.unsplash.com/photo-1584693786687-3e4b0a0e3e3e?w=400&h=400&fit=crop&q=80",
  },
];

const orderSteps = [
  { key: "pending", label: "Pendiente", completed: true },
  { key: "confirmed", label: "Confirmado", completed: true },
  { key: "preparing", label: "Preparando", completed: false, current: true },
  { key: "shipped", label: "Enviado", completed: false },
  { key: "delivered", label: "Entregado", completed: false },
];

export default function DashboardPage() {
  return (
    <AppLayout variant="client">
      <PageHeader title="Mi Panel" description="Bienvenido, Baby Store S.R.L" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-8 grid gap-6 sm:grid-cols-3"
      >
        {[
          {
            label: "Pedidos Activos",
            value: "2",
            icon: ShoppingCart01Icon,
            color: "bg-frosted-blue-500/20 text-cerulean-500",
          },
          {
            label: "Pendientes",
            value: "1",
            icon: Clock01Icon,
            color: "bg-cerulean-500/15 text-cerulean-600",
          },
          {
            label: "Entregados",
            value: "15",
            icon: CheckmarkCircle01Icon,
            color: "bg-honeydew-800/50 text-honeydew-200",
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
              <Card className="gap-4 p-6">
                <div
                  className={`flex size-12 items-center justify-center rounded-2xl ${stat.color}`}
                >
                  <Icon className="size-6" />
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
        transition={{ delay: 0.25, duration: 0.4 }}
        className="mt-8"
      >
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-on-surface">
              Pedido PED-001 - Seguimiento
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="mt-8"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-on-surface">
            Pedidos Recientes
          </h2>
          <Link href="/dashboard/ordenes">
            <Button variant="ghost" size="sm" className="gap-1">
              Ver historial
              <ArrowRight01Icon className="size-4" />
            </Button>
          </Link>
        </div>

        <Card className="p-0 overflow-hidden">
          {recentOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="flex items-center justify-between border-b border-outline-variant/5 px-6 py-4 transition-colors hover:bg-surface-container/30 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm font-semibold text-cerulean-500">
                  {order.id}
                </span>
                <div>
                  <p className="text-sm text-on-surface">{order.items} items</p>
                  <p className="text-xs text-on-surface-variant">
                    {order.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-on-surface">
                  ${order.total.toLocaleString("es-AR")}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                >
                  {statusLabels[order.status]}
                </span>
              </div>
            </motion.div>
          ))}
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-12 mb-8"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-on-surface">
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
          {suggestedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </motion.div>
    </AppLayout>
  );
}
