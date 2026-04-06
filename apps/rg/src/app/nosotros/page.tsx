"use client";

import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import {
  DeliveryTruck01Icon,
  Shield01Icon,
  StarIcon,
  Group01Icon,
} from "hugeicons-react";

const values = [
  {
    icon: Shield01Icon,
    title: "Calidad Certificada",
    description:
      "Trabajamos exclusivamente con marcas líderes del mercado infantil, garantizando productos seguros y certificados para tu negocio.",
  },
  {
    icon: DeliveryTruck01Icon,
    title: "Distribución Eficiente",
    description:
      "Nuestra logística está optimizada para que los pedidos lleguen a tiempo, manteniendo la cadena de suministro sin interrupciones.",
  },
  {
    icon: StarIcon,
    title: "Compromiso Familiar",
    description:
      "Entendemos la importancia del sector infantil. Cada producto que ofrecemos contribuye al bienestar de los más pequeños.",
  },
  {
    icon: Group01Icon,
    title: "Atención Personalizada",
    description:
      "Cada cliente recibe acompañamiento dedicado, asesoría de productos y soporte continuo para hacer crecer su negocio.",
  },
];

const milestones = [
  { year: "2015", event: "Inicio de operaciones" },
  { year: "2018", event: "Primeras 50 cuentas activas" },
  { year: "2020", event: "Expansión a todo el país" },
  { year: "2023", event: "Más de 100 clientes" },
  { year: "2026", event: "Plataforma digital RG" },
];

export default function NosotrosPage() {
  return (
    <PublicLayout>
      <div className="w-full px-6 py-16 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-hunter-green">
              Nuestra Historia
            </span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground [-0.02em] md:text-5xl">
              Sobre Robles Gonzalo
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Somos una empresa familiar dedicada a la distribución mayorista de
              productos para bebés. Con más de 10 años de experiencia,
              conectamos las mejores marcas con negocios de todo el país.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mx-auto max-w-5xl"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.08, duration: 0.4 }}
                >
                  <Card className="gap-4 p-6">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-vanilla-cream-300/10 text-vanilla-cream-300">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground [-0.02em]">
            Nuestra Trayectoria
          </h2>
          <div className="relative border-l-2 border-primary/20 pl-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + index * 0.08, duration: 0.4 }}
                className="relative pb-8 last:pb-0"
              >
                <div className="absolute -left-[41px] flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {index + 1}
                </div>
                <div>
                  <span className="text-sm font-bold text-hunter-green">
                    {milestone.year}
                  </span>
                  <p className="mt-1 text-muted-foreground">
                    {milestone.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
