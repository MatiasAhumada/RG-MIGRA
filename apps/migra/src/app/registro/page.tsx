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
  UserAdd01Icon,
  Mail01Icon,
  LockIcon,
  UserIcon,
  Building02Icon,
  SmartPhone01Icon,
  File01Icon,
} from "hugeicons-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    razonSocial: "",
    titular: "",
    cuit: "",
    correo: "",
    telefono: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    router.push("/login");
    setIsLoading(false);
  };

  return (
    <PublicLayout>
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-lg items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-3xl gradient-primary">
              <span className="text-2xl font-bold text-white">M</span>
            </div>
            <h1 className="text-headline-md text-on-surface">Crear cuenta</h1>
            <p className="mt-2 text-sm text-on-surface-variant">
              Completá el formulario para solicitar acceso al catálogo
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-label-sm text-on-surface">
                    Razón Social
                  </label>
                  <div className="relative">
                    <Building02Icon className="absolute top-3.5 left-4 size-4 text-on-surface-variant/50" />
                    <Input
                      placeholder="Mi Negocio S.R.L"
                      value={formData.razonSocial}
                      onChange={handleChange("razonSocial")}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-label-sm text-on-surface">
                    Titular
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute top-3.5 left-4 size-4 text-on-surface-variant/50" />
                    <Input
                      placeholder="Nombre completo"
                      value={formData.titular}
                      onChange={handleChange("titular")}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-label-sm text-on-surface">
                    C.U.I.T
                  </label>
                  <div className="relative">
                    <File01Icon className="absolute top-3.5 left-4 size-4 text-on-surface-variant/50" />
                    <Input
                      placeholder="20-12345678-9"
                      value={formData.cuit}
                      onChange={handleChange("cuit")}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-label-sm text-on-surface">
                    Teléfono
                  </label>
                  <div className="relative">
                    <SmartPhone01Icon className="absolute top-3.5 left-4 size-4 text-on-surface-variant/50" />
                    <Input
                      placeholder="+54 9 11 1234-5678"
                      value={formData.telefono}
                      onChange={handleChange("telefono")}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-label-sm text-on-surface">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail01Icon className="absolute top-3.5 left-4 size-4 text-on-surface-variant/50" />
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.correo}
                    onChange={handleChange("correo")}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-label-sm text-on-surface">
                  Contraseña
                </label>
                <div className="relative">
                  <LockIcon className="absolute top-3.5 left-4 size-4 text-on-surface-variant/50" />
                  <Input
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    value={formData.password}
                    onChange={handleChange("password")}
                    className="pl-10"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-on-primary/30 border-t-on-primary" />
                    Registrando...
                  </span>
                ) : (
                  <>
                    Solicitar Registro
                    <UserAdd01Icon className="size-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 border-t border-outline-variant/10 pt-6 text-center">
              <p className="text-sm text-on-surface-variant">
                ¿Ya tenés cuenta?{" "}
                <Link
                  href={ROUTES.LOGIN}
                  className="font-semibold text-secondary hover:underline"
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
