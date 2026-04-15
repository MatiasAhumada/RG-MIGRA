"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout";
import { PageHeader, DataTable, PdfUpload } from "@/components/common";
import { Card } from "@/components/ui/card";
import {
  Package01Icon,
  Group01Icon,
  ShoppingCart01Icon,
  Analytics01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "hugeicons-react";
import { clienteService, productoService, pedidoService } from "@/services";
import { formatCurrency } from "@/utils/formatters";
import {
  clientSuccessHandler,
  clientErrorHandler,
} from "@/utils/handlers/clientHandler";
import type { PedidoWithRelations } from "@/types/pedido.types";

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
  const [productCount, setProductCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [pedidos, setPedidos] = useState<PedidoWithRelations[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [productos, clientes, allPedidos] = await Promise.all([
        productoService.findAll(),
        clienteService.findAll(),
        pedidoService.findAll(),
      ]);

      setProductCount(productos.length);
      setClientCount(clientes.length);
      setPedidos(allPedidos.slice(0, 5));

      const revenue = allPedidos.reduce((sum, p) => sum + p.totalPedido, 0);
      setTotalRevenue(revenue);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadComplete = (fileName: string) => {
    clientSuccessHandler(
      `Catálogo "${fileName}" importado.\nProductos actualizados en el catálogo.`,
    );
    loadDashboardData();
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
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <PdfUpload onUploadComplete={handleUploadComplete} variant="full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          {
            label: "Productos Activos",
            value: productCount.toString(),
            change: "+0%",
            trend: "up" as const,
            icon: Package01Icon,
            color: "bg-[#336366]/20 text-[#4c7c7f]",
          },
          {
            label: "Clientes Registrados",
            value: clientCount.toString(),
            change: "+0%",
            trend: "up" as const,
            icon: Group01Icon,
            color: "bg-[#2b6485]/15 text-[#2b6485]",
          },
          {
            label: "Pedidos del Mes",
            value: pedidos.length.toString(),
            change: "+0%",
            trend: "up" as const,
            icon: ShoppingCart01Icon,
            color: "bg-[#336366]/20 text-[#4c7c7f]",
          },
          {
            label: "Facturación",
            value: totalRevenue ? formatCurrency(totalRevenue) : "$0",
            change: "+0%",
            trend: "up" as const,
            icon: Analytics01Icon,
            color: "bg-[#b7102a]/15 text-[#b7102a]",
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
                    {isLoading ? "..." : stat.value}
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-8"
      >
        <DataTable<PedidoWithRelations>
          title="Pedidos Recientes"
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
              key: "cliente",
              label: "Cliente",
              render: (item) => (
                <p className="text-sm font-medium text-[#161d16]">
                  {item.cliente.razonSocial}
                </p>
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
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[item.status]}`}
                >
                  {statusLabels[item.status]}
                </span>
              ),
            },
          ]}
          data={pedidos}
          keyExtractor={(item) => String(item.id)}
          emptyMessage="No hay pedidos recientes"
          totalLabel={`${pedidos.length} pedidos`}
        />
      </motion.div>
    </AppLayout>
  );
}
