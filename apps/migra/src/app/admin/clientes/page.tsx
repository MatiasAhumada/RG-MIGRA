"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout";
import { PageHeader, DataTable } from "@/components/common";
import { Button } from "@/components/ui/button";
import { GenericModal, ConfirmModal } from "@/components/common";
import {
  EyeIcon,
  CheckmarkCircle01Icon,
  CancelCircleIcon,
  Refresh01Icon,
} from "hugeicons-react";
import { clienteService } from "@/services";
import { clientSuccessHandler, clientErrorHandler } from "@/utils/handlers/clientHandler";
import { useDataQuery } from "@/hooks/useDataQuery";
import type { Cliente, ClienteStatus } from "@/types/cliente.types";

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
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [viewCliente, setViewCliente] = useState<Cliente | null>(null);
  const [approveCliente, setApproveCliente] = useState<Cliente | null>(null);
  const [rejectCliente, setRejectCliente] = useState<Cliente | null>(null);

  const { data: clientes, isLoading, refetch } = useDataQuery<Cliente[]>({
    fetcher: () => clienteService.findAll(debouncedSearch),
    refetchInterval: 5000,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    const timeout = setTimeout(() => {
      setDebouncedSearch(value);
    }, 500);

    return () => clearTimeout(timeout);
  };

  const handleApprove = async () => {
    if (!approveCliente) return;
    try {
      await clienteService.approve(approveCliente.id);

      clientSuccessHandler(
        `Cliente "${approveCliente.razonSocial}" aprobado.\nSe creó un usuario con contraseña temporal.`,
      );

      setApproveCliente(null);
      refetch();
    } catch (error) {
      clientErrorHandler(error);
    }
  };

  const handleReject = async () => {
    if (!rejectCliente) return;
    try {
      await clienteService.reject(rejectCliente.id);

      clientSuccessHandler(
        `Cliente "${rejectCliente.razonSocial}" rechazado.`,
      );

      setRejectCliente(null);
      refetch();
    } catch (error) {
      clientErrorHandler(error);
    }
  };

  const filteredClients = (clientes || []).filter(
    (c) =>
      c.razonSocial.toLowerCase().includes(search.toLowerCase()) ||
      c.titular.toLowerCase().includes(search.toLowerCase()) ||
      c.cuit.includes(search),
  );

  const pendingCount = filteredClients.filter(
    (c) => c.status === "PENDING",
  ).length;

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
                  style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
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
          data={isLoading ? [] : filteredClients}
          keyExtractor={(item) => String(item.id)}
          emptyMessage="No se encontraron clientes"
          searchPlaceholder="Buscar cliente..."
          onSearch={handleSearchChange}
          actions={
            <Button
              size="icon-sm"
              variant="ghost"
              className="rounded-full"
              onClick={refetch}
              disabled={isLoading}
              title="Actualizar ahora"
            >
              <Refresh01Icon className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          }
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
              {[
                { label: "Razón Social", value: viewCliente.razonSocial },
                { label: "Titular", value: viewCliente.titular },
                { label: "C.U.I.T", value: viewCliente.cuit },
                { label: "Correo", value: viewCliente.correo },
                { label: "Teléfono", value: viewCliente.telefono },
              ].map((field) => (
                <div key={field.label} className="rounded-xl bg-[#f3fcf0]/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#3d4a3d]">
                    {field.label}
                  </p>
                  <p
                    className="mt-1 text-sm font-semibold text-[#161d16]"
                    style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                  >
                    {field.value}
                  </p>
                </div>
              ))}
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
        description={`¿Estás seguro de que deseas aprobar a ${approveCliente?.razonSocial}? Se creará un usuario con contraseña temporal.`}
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
