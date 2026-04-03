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
} from "hugeicons-react";
import { ROUTES } from "@/constants/routes";

const features = [
  {
    icon: Shield01Icon,
    title: "Calidad Garantizada",
    description:
      "Productos seleccionados con los más altos estándares de calidad para tu negocio.",
  },
  {
    icon: DeliveryTruck01Icon,
    title: "Envíos a Todo el País",
    description:
      "Logística optimizada con cálculo de envío según tu ubicación.",
  },
  {
    icon: Analytics01Icon,
    title: "Precios Mayoristas",
    description: "Accedé a precios exclusivos para clientes registrados.",
  },
];

const sampleProducts = [
  {
    id: 1,
    name: "Pack Pañales Premium Talle M",
    tipo: "Pañales",
    sku: "PAN-PRE-M",
    price: 15800,
    imgUrl:
      "https://images.unsplash.com/photo-1594125345722-e6e726a33a79?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Toallitas Húmedas x100",
    tipo: "Higiene",
    sku: "TOH-100",
    price: 4200,
    imgUrl:
      "https://images.unsplash.com/photo-1627916560298-0227d0754b40?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Leche Infantil Fórmula 900g",
    tipo: "Alimentación",
    sku: "LEI-FOR-900",
    price: 12500,
    imgUrl:
      "https://images.unsplash.com/photo-1584693786687-3e4b0a0e3e3e?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Biberón Anticólicos 270ml",
    tipo: "Accesorios",
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
    name: "Chupete Silicona 6-18m",
    tipo: "Accesorios",
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
        <div className="w-full px-6 pt-20 md:px-12 lg:px-16 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-label-sm text-secondary">
              Distribuciones S.R.L
            </span>
            <h1 className="mt-4 text-display-lg font-extrabold text-on-surface">
              Tu socio en productos
              <span className="gradient-primary bg-clip-text text-transparent">
                {" "}
                infantiles
              </span>
            </h1>
            <p className="mt-6 text-lg text-on-surface-variant">
              Catálogo digital y automatización de pedidos para tu negocio.
              Accedé a precios exclusivos y gestioná tus órdenes de forma
              simple.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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

        <div className="absolute top-20 right-0 -z-10 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 size-80 rounded-full bg-secondary/5 blur-3xl" />
      </section>

      <section className="w-full px-6 py-20 md:px-12 lg:px-16">
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
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-secondary-container">
                  <Icon className="size-7 text-secondary" />
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

      <section className="w-full px-6 pb-20 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <span className="text-label-sm text-secondary">
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
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} {...product} showPrice={false} />
          ))}
        </motion.div>
      </section>

      <section className="w-full px-6 pb-24 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[2rem] gradient-primary p-12 text-center md:p-16"
        >
          <h2 className="text-2xl font-bold text-on-primary md:text-3xl">
            ¿Tenés un negocio? Accedé a precios mayoristas
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-on-primary/80">
            Registrate como cliente y obtené acceso completo al catálogo con
            precios, historial de pedidos y gestión de envíos.
          </p>
          <Link href={ROUTES.REGISTER}>
            <Button
              size="lg"
              className="mt-8 bg-on-primary text-primary hover:bg-on-primary/90"
            >
              Crear mi cuenta
              <Login01Icon className="ml-2 size-5" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </PublicLayout>
  );
}
