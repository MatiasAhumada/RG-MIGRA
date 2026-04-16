"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PublicLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import {
  Mail01Icon,
  UserIcon,
  Building02Icon,
  SmartPhone01Icon,
  File01Icon,
  CheckmarkCircle01Icon,
} from "hugeicons-react";
import { authService } from "@/services";
import {
  clientSuccessHandler,
  clientErrorHandler,
} from "@/utils/handlers/clientHandler";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    razonSocial: "",
    titular: "",
    cuit: "",
    correo: "",
    telefono: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.registerCliente({
        correo: formData.correo,
        razonSocial: formData.razonSocial,
        titular: formData.titular,
        cuit: formData.cuit,
        telefono: formData.telefono,
        empresaId: 1,
      });

      clientSuccessHandler(
        `Solicitud enviada correctamente.\nTu registro para "${formData.razonSocial}" será revisado por el administrador.`,
      );

      setIsSubmitted(true);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <PublicLayout>
        <div className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-lg items-center justify-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-[#7cb56e]/15">
                <CheckmarkCircle01Icon className="size-10 text-[#5a9a4e]" />
              </div>
            </div>
            <h1
              className="text-[1.75rem] font-extrabold text-[#161d16] md:text-[2.25rem]"
              style={{
                fontFamily:
                  "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Solicitud Enviada
            </h1>
            <p
              className="mt-3 text-sm text-[#3d4a3d]"
              style={{
                fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
              }}
            >
              Tu solicitud de registro para{" "}
              <strong className="font-semibold text-[#161d16]">
                {formData.razonSocial}
              </strong>{" "}
              fue recibida correctamente. El administrador la revisará y te
              notificará cuando tu cuenta esté activa.
            </p>
            <Link href={ROUTES.LOGIN}>
              <Button size="lg" className="mt-8 gap-2 rounded-[2rem]">
                Ir al Login
              </Button>
            </Link>
          </motion.div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-lg items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <div className="mb-10 text-center">
            <h1
              className="text-[1.75rem] font-extrabold text-[#161d16] md:text-[2.25rem]"
              style={{
                fontFamily:
                  "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Solicitar Registro
            </h1>
            <p
              className="mt-3 text-sm text-[#3d4a3d]"
              style={{
                fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
              }}
            >
              Completá el formulario para solicitar acceso al catálogo
            </p>
          </div>

          <Card className="rounded-[2rem] p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  Razón Social
                </label>
                <div className="relative">
                  <Building02Icon className="absolute top-4 left-4 size-5 text-[#3d4a3d]/50" />
                  <Input
                    placeholder="Mi Negocio S.R.L"
                    value={formData.razonSocial}
                    onChange={handleChange("razonSocial")}
                    className="h-12 pl-12 text-base"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  Titular
                </label>
                <div className="relative">
                  <UserIcon className="absolute top-4 left-4 size-5 text-[#3d4a3d]/50" />
                  <Input
                    placeholder="Nombre completo"
                    value={formData.titular}
                    onChange={handleChange("titular")}
                    className="h-12 pl-12 text-base"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold text-[#161d16]"
                    style={{
                      fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                    }}
                  >
                    C.U.I.T
                  </label>
                  <div className="relative">
                    <File01Icon className="absolute top-4 left-4 size-5 text-[#3d4a3d]/50" />
                    <Input
                      placeholder="20-12345678-9"
                      value={formData.cuit}
                      onChange={handleChange("cuit")}
                      className="h-12 pl-12 text-base"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold text-[#161d16]"
                    style={{
                      fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                    }}
                  >
                    Teléfono
                  </label>
                  <div className="relative">
                    <SmartPhone01Icon className="absolute top-4 left-4 size-5 text-[#3d4a3d]/50" />
                    <Input
                      placeholder="+54 9 11 1234-5678"
                      value={formData.telefono}
                      onChange={handleChange("telefono")}
                      className="h-12 pl-12 text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail01Icon className="absolute top-4 left-4 size-5 text-[#3d4a3d]/50" />
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.correo}
                    onChange={handleChange("correo")}
                    className="h-12 pl-12 text-base"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="gap-2 rounded-[2rem] text-base"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Enviando...
                  </span>
                ) : (
                  <>Enviar Solicitud</>
                )}
              </Button>
            </form>

            <div className="mt-6 border-t border-[#161d16]/5 pt-6 text-center">
              <p
                className="text-sm text-[#3d4a3d]"
                style={{
                  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                }}
              >
                ¿Ya tenés cuenta?{" "}
                <Link
                  href={ROUTES.LOGIN}
                  className="font-semibold text-[#2b6485] hover:underline"
                >
                  Ingresá acá
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
