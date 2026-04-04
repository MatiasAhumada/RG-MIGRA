"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AppLayout } from "@/components/layout";
import { PageHeader, NurtureBar } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft01Icon } from "hugeicons-react";

const orderDetail = {
  id: "PED-001",
  date: "03/04/2026",
  status: "CONFIRMED",
  total: 45200,
  items: [
    {
      name: "Pack Pañales Premium Talle M",
      sku: "PAN-PRE-M",
      qty: 4,
      unitPrice: 15800,
      subtotal: 63200,
    },
    {
      name: "Toallitas Húmedas x100",
      sku: "TOH-100",
      qty: 2,
      unitPrice: 4200,
      subtotal: 8400,
    },
  ],
  address: {
    provincia: "Buenos Aires",
    localidad: "Capital Federal",
    direccion: "Av. Corrientes 1234",
    codPostal: "1043",
  },
};

const orderSteps = [
  { key: "pending", label: "Pendiente", completed: true },
  { key: "confirmed", label: "Confirmado", completed: true },
  { key: "preparing", label: "Preparando", completed: false, current: true },
  { key: "shipped", label: "Enviado", completed: false },
  { key: "delivered", label: "Entregado", completed: false },
];

export default function DashboardPedidoPage() {
  return (
    <AppLayout variant="client">
      <PageHeader
        title={`Pedido ${orderDetail.id}`}
        description={`Realizado el ${orderDetail.date}`}
        action={
          <Link href="/dashboard/ordenes">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft01Icon className="size-4" />
              Volver a Pedidos
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
        <Card className="p-6">
          <h3 className="mb-4 text-base font-bold text-on-surface">
            Seguimiento del Pedido
          </h3>
          <NurtureBar steps={orderSteps} />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="mt-8 grid gap-6 lg:grid-cols-3"
      >
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden">
            <div className="border-b border-outline-variant/10 px-6 py-4">
              <h3 className="text-base font-bold text-on-surface">
                Detalle del Pedido
              </h3>
            </div>

            <div className="divide-y divide-outline-variant/5">
              {orderDetail.items.map((item, index) => (
                <motion.div
                  key={item.sku}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      {item.name}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      SKU: {item.sku}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-on-surface-variant">
                      {item.qty} x ${item.unitPrice.toLocaleString("es-AR")}
                    </p>
                    <p className="text-sm font-bold text-on-surface">
                      ${item.subtotal.toLocaleString("es-AR")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-outline-variant/10 px-6 py-4">
              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-sm text-on-surface-variant">
                    Total del Pedido
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    ${orderDetail.total.toLocaleString("es-AR")}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h3 className="mb-4 text-base font-bold text-on-surface">
              Dirección de Envío
            </h3>
            <div className="flex flex-col gap-3">
              <div className="rounded-xl bg-surface-container p-4">
                <p className="text-sm font-semibold text-on-surface">
                  {orderDetail.address.direccion}
                </p>
                <p className="text-sm text-on-surface-variant">
                  {orderDetail.address.localidad}
                </p>
                <p className="text-sm text-on-surface-variant">
                  {orderDetail.address.provincia}
                </p>
                <p className="text-sm text-on-surface-variant">
                  CP: {orderDetail.address.codPostal}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </AppLayout>
  );
}
