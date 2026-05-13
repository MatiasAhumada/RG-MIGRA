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
  Login01Icon,
  Mail01Icon,
  LockIcon,
  UserAdd01Icon,
} from "hugeicons-react";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login(email, password);

      const redirectPath = user.role === "ADMIN" ? "/admin" : "/dashboard";
      router.push(redirectPath);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-lg items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
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
              Bienvenido de vuelta
            </h1>
            <p
              className="mt-3 text-sm text-[#3d4a3d]"
              style={{
                fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
              }}
            >
              Ingresá a tu cuenta para acceder al catálogo completo
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
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail01Icon className="absolute top-4 left-4 size-5 text-[#3d4a3d]/50" />
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  Contraseña
                </label>
                <div className="relative">
                  <LockIcon className="absolute top-4 left-4 size-5 text-[#3d4a3d]/50" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    Ingresando...
                  </span>
                ) : (
                  <>
                    Iniciar Sesión
                    <Login01Icon className="size-5" />
                  </>
                )}
              </Button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#3d4a3d]/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-[#3d4a3d]/60">o</span>
                </div>
              </div>

              <Link href={ROUTES.REGISTER} className="w-full">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="w-full gap-2 rounded-[2rem] text-base"
                >
                  Hacerme Cliente
                  <UserAdd01Icon className="size-5" />
                </Button>
              </Link>
            </form>
          </Card>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
