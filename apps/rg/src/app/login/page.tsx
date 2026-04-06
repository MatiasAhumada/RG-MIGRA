"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PublicLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Login01Icon, Mail01Icon, LockIcon } from "hugeicons-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email === "admin@example.com") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }

    setIsLoading(false);
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
            <span className="mx-auto mb-6 flex h-16 items-center justify-center rounded-2xl bg-gradient-to-br from-hunter-green to-hunter-green-400 px-6 shadow-float text-2xl font-bold text-white whitespace-nowrap">
              RG
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground [-0.02em]">
              Bienvenido de vuelta
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Ingresá a tu cuenta para acceder al catálogo completo
            </p>
          </div>

          <Card elevation="elevated">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail01Icon className="absolute top-3.5 left-4 size-4 text-muted-foreground/50" />
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                  Contraseña
                </label>
                <div className="relative">
                  <LockIcon className="absolute top-3.5 left-4 size-4 text-muted-foreground/50" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
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
                    Ingresando...
                  </span>
                ) : (
                  <>
                    Iniciar Sesión
                    <Login01Icon className="size-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mx-6 mb-6 rounded-xl bg-vanilla-cream-700 p-4">
              <p className="text-xs text-muted-foreground">
                <strong>Demo:</strong> Usá{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-error">
                  admin@example.com
                </code>{" "}
                para el panel de administración.
              </p>
            </div>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tenés cuenta?{" "}
            <Link
              href="/registro"
              className="font-semibold text-hunter-green hover:underline"
            >
              Solicitá acceso
            </Link>
          </p>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
