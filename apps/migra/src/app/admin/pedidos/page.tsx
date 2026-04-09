"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout";
import { PageHeader, NurtureBar } from "@/components/common";
import { DataTable } from "@/components/common";
import { Button } from "@/components/ui/button";
import { GenericModal } from "@/components/common";
import { EyeIcon, FilterIcon } from "hugeicons-react";
import { formatCurrency } from "@/utils/formatters";
import type { NurtureBarStep } from "@/components/common";

interface Pedido {
  id: string;
  cliente: string;
  items: number;
  total: number;
  status: "PENDING" | "CONFIRMED" | "DOWNLOADED" | "SHIPPED";
  date: string;
}

const sampleOrders: Pedido[] = [
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
    status: "CONFIRMED",
    date: "02/04/2026",
  },
  {
    id: "PED-005",
    cliente: "Baby Store S.R.L",
    items: 18,
    total: 51300,
    status: "DOWNLOADED",
    date: "01/04/2026",
  },
  {
    id: "PED-006",
    cliente: "Mundo Bebé",
    items: 3,
    total: 9600,
    status: "PENDING",
    date: "31/03/2026",
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

const orderSteps: NurtureBarStep[] = [
  { key: "pending", label: "Pendiente", completed: true },
  { key: "confirmed", label: "Confirmado", completed: true },
  { key: "downloaded", label: "Descargado", completed: false, current: true },
  { key: "shipped", label: "Enviado", completed: false },
];

const orderItems: Record<
  string,
  { name: string; sku: string; qty: number; unitPrice: number }[]
> = {
  "PED-001": [
    {
      name: "Pack Pañales Premium Talle M",
      sku: "PAN-PRE-M",
      qty: 4,
      unitPrice: 15800,
    },
    { name: "Toallitas Húmedas x100", sku: "TOH-100", qty: 2, unitPrice: 4200 },
    {
      name: "Leche Infantil Fórmula 900g",
      sku: "LEI-FOR-900",
      qty: 6,
      unitPrice: 12500,
    },
  ],
  "PED-002": [
    {
      name: "Biberón Anticólicos 270ml",
      sku: "BIB-ANT-270",
      qty: 8,
      unitPrice: 6800,
    },
  ],
  "PED-003": [
    {
      name: "Pack Pañales Premium Talle L",
      sku: "PAN-PRE-L",
      qty: 10,
      unitPrice: 17200,
    },
    {
      name: "Crema Hidratante Bebé 200g",
      sku: "CRH-BEB-200",
      qty: 14,
      unitPrice: 5400,
    },
  ],
  "PED-004": [
    {
      name: "Chupete Silicona 6-18m",
      sku: "CHU-SIL-618",
      qty: 6,
      unitPrice: 3200,
    },
  ],
  "PED-005": [
    {
      name: "Mochila Pañalera Premium",
      sku: "MOC-PRE-001",
      qty: 3,
      unitPrice: 18500,
    },
    {
      name: "Pack Toallas de Baño x3",
      sku: "TOB-BAO-3",
      qty: 15,
      unitPrice: 8900,
    },
  ],
  "PED-006": [
    {
      name: "Talco Puder Bebé 300g",
      sku: "TAL-PUD-300",
      qty: 3,
      unitPrice: 3800,
    },
  ],
};

export default function AdminPedidosPage() {
  const [search, setSearch] = useState("");
  const [selectedPedido, setSelectedPedido] = useState<string | null>(null);

  const filteredOrders = sampleOrders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.cliente.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedData = sampleOrders.find((o) => o.id === selectedPedido);

  return (
    <AppLayout variant="admin">
      <PageHeader
        title="Pedidos"
        description="Gestión de pedidos y órdenes de compra"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-8"
      >
        <DataTable<Pedido>
          title=""
          subtitle=""
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
              key: "items",
              label: "Items",
              render: (item) => (
                <p className="text-sm text-[#3d4a3d]">{item.items}</p>
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
                  {formatCurrency(item.total)}
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
            {
              key: "actions",
              label: "Acciones",
              render: (item) => (
                <div className="flex items-center gap-2">
                  <Button
                    size="icon-xs"
                    variant="outline"
                    onClick={() => setSelectedPedido(item.id)}
                    title="Ver detalle"
                  >
                    <EyeIcon className="size-3" />
                  </Button>
                </div>
              ),
            },
          ]}
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          emptyMessage="No se encontraron pedidos"
          searchPlaceholder="Buscar pedido..."
          onSearch={setSearch}
          actions={
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-[2rem]"
            >
              <FilterIcon className="size-4" />
              Filtrar
            </Button>
          }
          totalLabel={`${filteredOrders.length} pedidos`}
        />
      </motion.div>

      <GenericModal
        open={!!selectedPedido}
        onOpenChange={() => setSelectedPedido(null)}
        title={`Pedido ${selectedPedido}`}
        description={`Detalle y seguimiento del pedido`}
        size="xl"
      >
        {selectedPedido && selectedData && (
          <div className="flex flex-col gap-6">
            <div>
              <h3
                className="mb-3 text-sm font-bold text-[#161d16]"
                style={{
                  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                }}
              >
                Seguimiento
              </h3>
              <NurtureBar steps={orderSteps} />
            </div>

            <div>
              <h3
                className="mb-3 text-sm font-bold text-[#161d16]"
                style={{
                  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                }}
              >
                Items del Pedido
              </h3>
              <div className="divide-y divide-[#161d16]/5 rounded-xl border border-[#161d16]/5">
                {(orderItems[selectedPedido] || []).map((item) => (
                  <div
                    key={item.sku}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <div>
                      <p
                        className="text-sm font-semibold text-[#161d16]"
                        style={{
                          fontFamily:
                            "'Manrope', 'Inter', system-ui, sans-serif",
                        }}
                      >
                        {item.name}
                      </p>
                      <p className="text-xs text-[#3d4a3d]">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#3d4a3d]">
                        {item.qty} x {formatCurrency(item.unitPrice)}
                      </p>
                      <p
                        className="text-sm font-bold text-[#161d16]"
                        style={{
                          fontFamily:
                            "'Manrope', 'Inter', system-ui, sans-serif",
                        }}
                      >
                        {formatCurrency(item.qty * item.unitPrice)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#f3fcf0]/60 p-4">
              <div>
                <p className="text-sm text-[#3d4a3d]">Cliente</p>
                <p
                  className="text-sm font-semibold text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {selectedData.cliente}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#3d4a3d]">Total</p>
                <p
                  className="text-xl font-bold text-[#b7102a]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {formatCurrency(selectedData.total)}
                </p>
              </div>
            </div>
          </div>
        )}
      </GenericModal>
    </AppLayout>
  );
}
