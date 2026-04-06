"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PublicLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/common";
import {
  ShoppingCart01Icon,
  Shield01Icon,
  DeliveryTruck01Icon,
  Analytics01Icon,
  ArrowRight01Icon,
  GridIcon,
  Login01Icon,
  CheckmarkCircle01Icon,
} from "hugeicons-react";
import { ROUTES } from "@/constants/routes";

const features = [
  {
    icon: Shield01Icon,
    title: "Calidad Certificada",
    description:
      "Productos de las marcas líderes en chupetes, mamaderas y accesorios infantiles con control de calidad garantizado.",
  },
  {
    icon: DeliveryTruck01Icon,
    title: "Distribución Puntual",
    description:
      "Entregas programadas a todo el país con seguimiento en tiempo real de tus pedidos.",
  },
  {
    icon: Analytics01Icon,
    title: "Precios Mayoristas",
    description:
      "Tarifas exclusivas para comercios registrados con descuentos por volumen.",
  },
];

const sampleProducts = [
  {
    id: 1,
    name: "Pack Pañales Premium Talle M x50",
    tipo: "Pañales",
    sku: "PAN-PRE-M",
    price: 15800,
    imgUrl:
      "https://images.unsplash.com/photo-1594125345722-e6e726a33a79?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Toallitas Húmedas Suaves x100",
    tipo: "Higiene",
    sku: "TOH-100",
    price: 4200,
    imgUrl:
      "https://images.unsplash.com/photo-1627916560298-0227d0754b40?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Leche Infantil Fórmula Premium 900g",
    tipo: "Alimentación",
    sku: "LEI-FOR-900",
    price: 12500,
    imgUrl:
      "https://images.unsplash.com/photo-1584693786687-3e4b0a0e3e3e?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Biberón Anticólicos 270ml",
    tipo: "Mamaderas",
    sku: "BIB-ANT-270",
    price: 6800,
    imgUrl:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Crema Hidratante Bebé 200g",
    tipo: "Cuidado",
    sku: "CRH-BEB-200",
    price: 5400,
    imgUrl:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Chupete Anatómico Silicona 6-18m",
    tipo: "Chupetes",
    sku: "CHU-SIL-618",
    price: 3200,
    imgUrl:
      "https://images.unsplash.com/photo-1594125345722-e6e726a33a79?w=400&h=400&fit=crop",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="relative overflow-hidden">
        <div className="w-full px-6 pt-32 pb-20 md:px-20 md:pt-40 lg:px-32 lg:pt-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <h1 className="mt-6 text-display-lg font-extrabold leading-[1.1] text-on-surface">
              Tu socio en{" "}
              <span className="text-cerulean-500">productos infantiles</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-on-surface-variant">
              Distribución mayorista de chupetes, mamaderas, pañales y
              accesorios para tu negocio. Accedé a precios exclusivos y gestioná
              tus pedidos de forma simple.
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link href={ROUTES.CATALOG}>
                <Button size="lg" className="gap-2">
                  Ver Catálogo
                  <GridIcon className="size-5" />
                </Button>
              </Link>
              <Link href={ROUTES.REGISTER}>
                <Button variant="outline" size="lg" className="gap-2">
                  Registrarse
                  <ArrowRight01Icon className="size-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-20 right-0 -z-10 size-[600px] rounded-full bg-cerulean-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 size-[500px] rounded-full bg-frosted-blue-500/10 blur-3xl" />
      </section>

      <section className="w-full px-6 py-24 md:px-20 lg:px-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-[0_8px_40px_rgba(29,53,87,0.04)] transition-shadow hover:shadow-[0_12px_48px_rgba(29,53,87,0.08)]"
              >
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-frosted-blue-500/20">
                  <Icon className="size-7 text-cerulean-500" />
                </div>
                <h3 className="text-lg font-bold text-on-surface">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className="w-full px-6 pb-24 md:px-20 lg:px-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <span className="text-label-sm text-cerulean-500">
              Productos Destacados
            </span>
            <h2 className="mt-2 text-headline-md text-on-surface">
              Explorá nuestro catálogo
            </h2>
          </div>
          <Link href={ROUTES.CATALOG}>
            <Button variant="ghost" size="sm" className="gap-1">
              Ver todos
              <ArrowRight01Icon className="size-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} {...product} showPrice={false} />
          ))}
        </motion.div>
      </section>

      <section className="w-full px-6 pb-32 md:px-20 lg:px-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-cerulean-500 to-cerulean-700 p-12 text-center md:p-20"
        >
          <motion.div
            animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/5 blur-3xl"
          />

          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-block rounded-full bg-white/15 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm"
            >
              Exclusivo Mayoristas
            </motion.span>

            <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
              Hacé crecer tu negocio
              <br />
              <span className="text-yellow-green-400">
                con los mejores precios
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
              <strong className="font-semibold text-white">Venta mayorista, siempre.</strong>{" "}
              Registrate como cliente verificado y accedé al catálogo completo con{" "}
              <strong className="text-yellow-green-400">precios exclusivos</strong>, historial de pedidos,{" "}
              seguimiento de envíos y gestión integral desde tu panel personalizado.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/80"
            >
              <span className="flex items-center gap-2">
                <CheckmarkCircle01Icon className="size-5 text-yellow-green-400" />
                Precios mayoristas
              </span>
              <span className="flex items-center gap-2">
                <CheckmarkCircle01Icon className="size-5 text-yellow-green-400" />
                Historial de pedidos
              </span>
              <span className="flex items-center gap-2">
                <CheckmarkCircle01Icon className="size-5 text-yellow-green-400" />
                Seguimiento de envíos
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href={ROUTES.REGISTER}>
                <Button
                  size="lg"
                  className="mt-8 gap-2 bg-yellow-green-500 text-white font-bold shadow-xl shadow-yellow-green-500/30 hover:bg-yellow-green-400 hover:shadow-2xl"
                >
                  Crear mi cuenta
                  <Login01Icon className="size-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </PublicLayout>
  );
}
