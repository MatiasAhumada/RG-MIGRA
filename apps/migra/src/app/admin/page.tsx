"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout";
import { PageHeader, DataTable, PdfUploadCompact } from "@/components/common";
import { Card } from "@/components/ui/card";
import {
  Package01Icon,
  Group01Icon,
  ShoppingCart01Icon,
  Analytics01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "hugeicons-react";
import { clientSuccessHandler } from "@/utils/handlers/clientHandler";

const stats = [
  {
    label: "Productos Activos",
    value: "248",
    change: "+12%",
    trend: "up" as const,
    icon: Package01Icon,
    color: "bg-[#336366]/20 text-[#4c7c7f]",
  },
  {
    label: "Clientes Registrados",
    value: "86",
    change: "+8%",
    trend: "up" as const,
    icon: Group01Icon,
    color: "bg-[#2b6485]/15 text-[#2b6485]",
  },
  {
    label: "Pedidos del Mes",
    value: "142",
    change: "+23%",
    trend: "up" as const,
    icon: ShoppingCart01Icon,
    color: "bg-[#336366]/20 text-[#4c7c7f]",
  },
  {
    label: "Facturación",
    value: "$2.4M",
    change: "-3%",
    trend: "down" as const,
    icon: Analytics01Icon,
    color: "bg-[#b7102a]/15 text-[#b7102a]",
  },
];

interface Pedido {
  id: string;
  cliente: string;
  total: string;
  status: "PENDING" | "CONFIRMED" | "DOWNLOADED" | "SHIPPED";
  date: string;
}

const recentOrders: Pedido[] = [
  {
    id: "PED-001",
    cliente: "Baby Store S.R.L",
    total: "$45.200",
    status: "CONFIRMED",
    date: "03/04/2026",
  },
  {
    id: "PED-002",
    cliente: "Mundo Bebé",
    total: "$32.800",
    status: "PENDING",
    date: "03/04/2026",
  },
  {
    id: "PED-003",
    cliente: "Pequeños Pasos",
    total: "$67.500",
    status: "SHIPPED",
    date: "02/04/2026",
  },
  {
    id: "PED-004",
    cliente: "La Casita del Bebé",
    total: "$28.900",
    status: "CONFIRMED",
    date: "02/04/2026",
  },
  {
    id: "PED-005",
    cliente: "Baby Store S.R.L",
    total: "$51.300",
    status: "DOWNLOADED",
    date: "01/04/2026",
  },
];

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

export default function AdminPage() {
  const handleUploadComplete = (fileName: string) => {
    clientSuccessHandler(
      `Catálogo "${fileName}" importado. Productos actualizados en el catálogo.`,
    );
  };

  return (
    <AppLayout variant="admin">
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
              <Card className="rounded-[2rem] gap-4 p-6">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex size-12 items-center justify-center rounded-2xl ${stat.color}`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" ? "text-[#2b6485]" : "text-[#b7102a]"}`}
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
                  <p
                    className="text-2xl font-bold text-[#161d16]"
                    style={{
                      fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-sm text-[#3d4a3d]"
                    style={{
                      fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <PdfUploadCompact onUploadComplete={handleUploadComplete} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-8"
      >
        <DataTable<Pedido>
          title="Pedidos Recientes"
          columns={[
            {
              key: "id",
              label: "Pedido",
              render: (item) => (
                <span className="font-mono text-sm font-semibold text-[#2b6485]">
                  {item.id}
                </span>
              ),
            },
            {
              key: "cliente",
              label: "Cliente",
              render: (item) => (
                <p className="text-sm font-medium text-[#161d16]">
                  {item.cliente}
                </p>
              ),
            },
            {
              key: "date",
              label: "Fecha",
              render: (item) => (
                <p className="text-sm text-[#3d4a3d]">{item.date}</p>
              ),
            },
            {
              key: "total",
              label: "Total",
              render: (item) => (
                <p
                  className="text-sm font-semibold text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {item.total}
                </p>
              ),
            },
            {
              key: "status",
              label: "Estado",
              render: (item) => (
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[item.status]}`}
                >
                  {statusLabels[item.status]}
                </span>
              ),
            },
          ]}
          data={recentOrders}
          keyExtractor={(item) => item.id}
          emptyMessage="No hay pedidos recientes"
          totalLabel={`${recentOrders.length} pedidos`}
        />
      </motion.div>
    </AppLayout>
  );
}
