"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Mail01Icon,
  SmartPhone01Icon,
  Location01Icon,
  MailSend01Icon,
} from "hugeicons-react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsLoading(false);
  };

  return (
    <PublicLayout>
      <div className="w-full px-6 py-16 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-hunter-green">
              Hablemos
            </span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground [-0.02em] md:text-5xl">
              Contacto
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              ¿Tenés consultas sobre nuestros productos o querés ser cliente?
              Escribinos y te respondemos a la brevedad.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="flex flex-col gap-6">
                <Card className="p-6">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-vanilla-cream-300/10 text-vanilla-cream-300">
                    <Mail01Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    Correo
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    info@roblesgonzalo.com
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-sage-green-800 text-sage-green-400">
                    <SmartPhone01Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    Teléfono
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    +54 9 11 1234-5678
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-hunter-green/10 text-hunter-green">
                    <Location01Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    Ubicación
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Buenos Aires, Argentina
                  </p>
                </Card>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="p-6">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-hunter-green/10 text-hunter-green">
                      <MailSend01Icon className="size-8" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-foreground">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Te responderemos lo antes posible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">
                          Nombre
                        </label>
                        <Input
                          placeholder="Tu nombre"
                          value={formData.nombre}
                          onChange={handleChange("nombre")}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">
                          Correo
                        </label>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.correo}
                          onChange={handleChange("correo")}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-foreground">
                        Teléfono
                      </label>
                      <Input
                        placeholder="+54 9 11 1234-5678"
                        value={formData.telefono}
                        onChange={handleChange("telefono")}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-foreground">
                        Mensaje
                      </label>
                      <textarea
                        rows={4}
                        className="min-h-[120px] w-full rounded-xl bg-vanilla-cream-700 px-4 py-3 text-sm leading-relaxed text-foreground transition-all outline-none placeholder:text-muted-foreground/50 focus:bg-card focus:ring-1 focus:ring-primary"
                        placeholder="¿En qué podemos ayudarte?"
                        value={formData.mensaje}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            mensaje: e.target.value,
                          }))
                        }
                        required
                      />
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
                          Enviando...
                        </span>
                      ) : (
                        <>
                          Enviar Mensaje
                          <MailSend01Icon className="size-5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
