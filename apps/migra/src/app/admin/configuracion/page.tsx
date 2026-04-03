"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout";
import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Building02Icon,
  Mail01Icon,
  SmartPhone01Icon,
  Location01Icon,
  FloppyDiskIcon,
} from "hugeicons-react";

export default function AdminConfigPage() {
  return (
    <DashboardLayout variant="admin">
      <PageHeader
        title="Configuración"
        description="Datos de la empresa y preferencias del sistema"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-8 grid gap-6 lg:grid-cols-2"
      >
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-secondary-container">
              <Building02Icon className="size-5 text-secondary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">
                Datos de la Empresa
              </h3>
              <p className="text-xs text-on-surface-variant">
                Información fiscal y de contacto
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-label-sm text-on-surface">
                Razón Social
              </label>
              <Input defaultValue="MIGRA Distribuciones S.R.L" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-sm text-on-surface">C.U.I.T</label>
              <Input defaultValue="33-70903990-9" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-sm text-on-surface">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail01Icon className="absolute top-3.5 left-4 size-4 text-on-surface-variant/50" />
                <Input defaultValue="contacto@migra.com" className="pl-10" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-sm text-on-surface">Teléfono</label>
              <div className="relative">
                <SmartPhone01Icon className="absolute top-3.5 left-4 size-4 text-on-surface-variant/50" />
                <Input defaultValue="+54 11 1234-5678" className="pl-10" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-sm text-on-surface">Dirección</label>
              <div className="relative">
                <Location01Icon className="absolute top-3.5 left-4 size-4 text-on-surface-variant/50" />
                <Input
                  defaultValue="Av. Principal 1234, CABA"
                  className="pl-10"
                />
              </div>
            </div>
            <Button className="gap-2">
              <FloppyDiskIcon className="size-4" />
              Guardar Cambios
            </Button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-honeydew-800/50">
              <svg
                className="size-5 text-honeydew-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">
                Información del Sistema
              </h3>
              <p className="text-xs text-on-surface-variant">
                Versión y estado
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { label: "Versión", value: "1.0.0" },
              { label: "Base de Datos", value: "PostgreSQL - Conectada" },
              { label: "Última Migración", value: "02/04/2026" },
              { label: "Productos Activos", value: "248" },
              { label: "Clientes Registrados", value: "86" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl bg-surface-container p-4"
              >
                <span className="text-sm text-on-surface-variant">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-on-surface">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
