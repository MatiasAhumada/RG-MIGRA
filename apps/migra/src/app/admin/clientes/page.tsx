"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout";
import { PageHeader } from "@/components/common";
import { DataTable } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GenericModal, ConfirmModal } from "@/components/common";
import {
  EyeIcon,
  CheckmarkCircle01Icon,
  CancelCircleIcon,
} from "hugeicons-react";
import {
  clientSuccessHandler,
  clientErrorHandler,
} from "@/utils/handlers/clientHandler";

interface Cliente {
  id: number;
  razonSocial: string;
  titular: string;
  cuit: string;
  correo: string;
  telefono: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  date: string;
}

const sampleClients: Cliente[] = [
  {
    id: 1,
    razonSocial: "Baby Store S.R.L",
    titular: "Juan Pérez",
    cuit: "30-71234567-8",
    correo: "contacto@babystore.com",
    telefono: "+54 11 1234-5678",
    status: "APPROVED",
    date: "15/03/2026",
  },
  {
    id: 2,
    razonSocial: "Mundo Bebé",
    titular: "María García",
    cuit: "30-71234568-9",
    correo: "info@mundobebe.com",
    telefono: "+54 11 2345-6789",
    status: "APPROVED",
    date: "18/03/2026",
  },
  {
    id: 3,
    razonSocial: "Pequeños Pasos",
    titular: "Carlos López",
    cuit: "30-71234569-0",
    correo: "ventas@pequeñospasos.com",
    telefono: "+54 11 3456-7890",
    status: "PENDING",
    date: "01/04/2026",
  },
  {
    id: 4,
    razonSocial: "La Casita del Bebé",
    titular: "Ana Martínez",
    cuit: "30-71234570-1",
    correo: "admin@lacasitabebe.com",
    telefono: "+54 11 4567-8901",
    status: "PENDING",
    date: "02/04/2026",
  },
  {
    id: 5,
    razonSocial: "Baby World",
    titular: "Roberto Sánchez",
    cuit: "30-71234571-2",
    correo: "info@babyworld.com",
    telefono: "+54 11 5678-9012",
    status: "REJECTED",
    date: "20/03/2026",
  },
];

const statusStyles: Record<string, string> = {
  APPROVED: "bg-[#7cb56e]/15 text-[#5a9a4e]",
  PENDING: "bg-[#2b6485]/15 text-[#2b6485]",
  REJECTED: "bg-[#db313f]/15 text-[#db313f]",
};

const statusLabels: Record<string, string> = {
  APPROVED: "Aprobado",
  PENDING: "Pendiente",
  REJECTED: "Rechazado",
};

export default function AdminClientesPage() {
  const [search, setSearch] = useState("");
  const [viewCliente, setViewCliente] = useState<Cliente | null>(null);
  const [approveCliente, setApproveCliente] = useState<Cliente | null>(null);
  const [rejectCliente, setRejectCliente] = useState<Cliente | null>(null);

  const filteredClients = sampleClients.filter(
    (c) =>
      c.razonSocial.toLowerCase().includes(search.toLowerCase()) ||
      c.titular.toLowerCase().includes(search.toLowerCase()) ||
      c.cuit.includes(search),
  );

  const pendingCount = filteredClients.filter(
    (c) => c.status === "PENDING",
  ).length;

  const handleApprove = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      clientSuccessHandler(
        `Cliente "${approveCliente?.razonSocial}" aprobado exitosamente. Ya puede acceder al catálogo.`,
      );

      setApproveCliente(null);
    } catch (error) {
      clientErrorHandler(error);
    }
  };

  const handleReject = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      clientSuccessHandler(
        `Cliente "${rejectCliente?.razonSocial}" rechazado correctamente.`,
      );

      setRejectCliente(null);
    } catch (error) {
      clientErrorHandler(error);
    }
  };

  return (
    <AppLayout variant="admin">
      <PageHeader
        title="Clientes"
        description="Gestión de clientes registrados"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-8"
      >
        <DataTable<Cliente>
          title=""
          subtitle=""
          columns={[
            {
              key: "razonSocial",
              label: "Razón Social",
              render: (item) => (
                <p
                  className="font-semibold text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {item.razonSocial}
                </p>
              ),
            },
            {
              key: "titular",
              label: "Titular",
              render: (item) => (
                <p className="text-sm text-[#161d16]">{item.titular}</p>
              ),
            },
            {
              key: "cuit",
              label: "C.U.I.T",
              render: (item) => (
                <p className="text-sm text-[#3d4a3d] font-mono">{item.cuit}</p>
              ),
            },
            {
              key: "correo",
              label: "Correo",
              render: (item) => (
                <p className="text-sm text-[#3d4a3d]">{item.correo}</p>
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
                    onClick={() => setViewCliente(item)}
                    title="Ver detalle"
                  >
                    <EyeIcon className="size-3" />
                  </Button>
                  {item.status === "PENDING" && (
                    <>
                      <Button
                        size="icon-xs"
                        className="bg-[#7cb56e] text-white hover:bg-[#5a9a4e]"
                        onClick={() => setApproveCliente(item)}
                        title="Aprobar"
                      >
                        <CheckmarkCircle01Icon className="size-3" />
                      </Button>
                      <Button
                        size="icon-xs"
                        variant="outline"
                        className="text-[#db313f] hover:bg-[#db313f]/10"
                        onClick={() => setRejectCliente(item)}
                        title="Rechazar"
                      >
                        <CancelCircleIcon className="size-3" />
                      </Button>
                    </>
                  )}
                </div>
              ),
            },
          ]}
          data={filteredClients}
          keyExtractor={(item) => item.id.toString()}
          emptyMessage="No se encontraron clientes"
          searchPlaceholder="Buscar cliente..."
          onSearch={setSearch}
          totalLabel={`${filteredClients.length} clientes (${pendingCount} pendientes)`}
        />
      </motion.div>

      <GenericModal
        open={!!viewCliente}
        onOpenChange={() => setViewCliente(null)}
        title="Detalle del Cliente"
        size="lg"
      >
        {viewCliente && (
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-[#f3fcf0]/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#3d4a3d]">
                  Razón Social
                </p>
                <p
                  className="mt-1 text-sm font-semibold text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {viewCliente.razonSocial}
                </p>
              </div>
              <div className="rounded-xl bg-[#f3fcf0]/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#3d4a3d]">
                  Titular
                </p>
                <p
                  className="mt-1 text-sm text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {viewCliente.titular}
                </p>
              </div>
              <div className="rounded-xl bg-[#f3fcf0]/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#3d4a3d]">
                  C.U.I.T
                </p>
                <p
                  className="mt-1 text-sm font-mono text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {viewCliente.cuit}
                </p>
              </div>
              <div className="rounded-xl bg-[#f3fcf0]/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#3d4a3d]">
                  Correo
                </p>
                <p
                  className="mt-1 text-sm text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {viewCliente.correo}
                </p>
              </div>
              <div className="rounded-xl bg-[#f3fcf0]/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#3d4a3d]">
                  Teléfono
                </p>
                <p
                  className="mt-1 text-sm text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {viewCliente.telefono}
                </p>
              </div>
              <div className="rounded-xl bg-[#f3fcf0]/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#3d4a3d]">
                  Estado
                </p>
                <div className="mt-1">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[viewCliente.status]}`}
                  >
                    {statusLabels[viewCliente.status]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </GenericModal>

      <ConfirmModal
        open={!!approveCliente}
        onOpenChange={() => setApproveCliente(null)}
        title="Aprobar Cliente"
        description={`¿Estás seguro de que deseas aprobar a ${approveCliente?.razonSocial}? Podrá acceder al catálogo completo.`}
        onConfirm={handleApprove}
        confirmText="Aprobar"
      />

      <ConfirmModal
        open={!!rejectCliente}
        onOpenChange={() => setRejectCliente(null)}
        title="Rechazar Cliente"
        description={`¿Estás seguro de que deseas rechazar a ${rejectCliente?.razonSocial}? Esta acción no se puede deshacer.`}
        onConfirm={handleReject}
        confirmText="Rechazar"
        variant="destructive"
      />
    </AppLayout>
  );
}
