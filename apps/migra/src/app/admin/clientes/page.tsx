"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout";
import { PageHeader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Search01Icon,
  EyeIcon,
  CheckmarkCircle01Icon,
  CancelCircleIcon,
} from "hugeicons-react";

const sampleClients = [
  {
    id: 1,
    razonSocial: "Baby Store S.R.L",
    titular: "Juan Pérez",
    cuit: "30-71234567-8",
    correo: "contacto@babystore.com",
    status: "APPROVED",
    date: "15/03/2026",
  },
  {
    id: 2,
    razonSocial: "Mundo Bebé",
    titular: "María García",
    cuit: "30-71234568-9",
    correo: "info@mundobebe.com",
    status: "APPROVED",
    date: "18/03/2026",
  },
  {
    id: 3,
    razonSocial: "Pequeños Pasos",
    titular: "Carlos López",
    cuit: "30-71234569-0",
    correo: "ventas@pequeñospasos.com",
    status: "PENDING",
    date: "01/04/2026",
  },
  {
    id: 4,
    razonSocial: "La Casita del Bebé",
    titular: "Ana Martínez",
    cuit: "30-71234570-1",
    correo: "admin@lacasitabebe.com",
    status: "PENDING",
    date: "02/04/2026",
  },
  {
    id: 5,
    razonSocial: "Baby World",
    titular: "Roberto Sánchez",
    cuit: "30-71234571-2",
    correo: "info@babyworld.com",
    status: "REJECTED",
    date: "20/03/2026",
  },
];

const statusStyles: Record<string, string> = {
  APPROVED: "bg-honeydew-800/50 text-honeydew-200",
  PENDING: "bg-cerulean-900/30 text-cerulean-400",
  REJECTED: "bg-punch-red-900/30 text-punch-red-400",
};

const statusLabels: Record<string, string> = {
  APPROVED: "Aprobado",
  PENDING: "Pendiente",
  REJECTED: "Rechazado",
};

export default function AdminClientesPage() {
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout variant="admin">
      <PageHeader
        title="Clientes"
        description="Gestión de clientes registrados"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-6"
      >
        <div className="relative max-w-sm">
          <Search01Icon className="absolute top-3.5 left-4 size-4 text-on-surface-variant/50" />
          <Input
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-8"
      >
        <Card className="p-0 overflow-hidden">
          <div className="hidden gap-4 border-b border-outline-variant/10 px-6 py-4 md:grid md:grid-cols-12 text-label-sm text-on-surface-variant">
            <div className="col-span-3">Razón Social</div>
            <div className="col-span-2">Titular</div>
            <div className="col-span-2">C.U.I.T</div>
            <div className="col-span-2">Correo</div>
            <div className="col-span-1">Estado</div>
            <div className="col-span-2 text-right">Acciones</div>
          </div>

          {sampleClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.05 }}
              className="flex flex-col gap-3 border-b border-outline-variant/5 px-6 py-4 transition-colors hover:bg-surface-container/30 last:border-b-0 md:grid md:grid-cols-12 md:items-center md:gap-4"
            >
              <div className="col-span-3">
                <p className="font-semibold text-on-surface">
                  {client.razonSocial}
                </p>
                <p className="text-xs text-on-surface-variant md:hidden">
                  {client.cuit}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-on-surface">{client.titular}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-on-surface-variant">{client.cuit}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-on-surface-variant">
                  {client.correo}
                </p>
              </div>
              <div className="col-span-1">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[client.status]}`}
                >
                  {statusLabels[client.status]}
                </span>
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <Button size="icon-xs" variant="outline">
                  <EyeIcon className="size-3" />
                </Button>
                {client.status === "PENDING" && (
                  <>
                    <Button
                      size="icon-xs"
                      className="bg-honeydew-200 text-white hover:bg-honeydew-200/90"
                    >
                      <CheckmarkCircle01Icon className="size-3" />
                    </Button>
                    <Button
                      size="icon-xs"
                      variant="outline"
                      className="text-destructive"
                    >
                      <CancelCircleIcon className="size-3" />
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
