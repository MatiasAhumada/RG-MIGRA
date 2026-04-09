"use client";

import { useState, useRef, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PublicLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/common";
import { useSearch } from "@/context/search-context";
import {
  ArrowRight01Icon,
  Login01Icon,
  CheckmarkCircle01Icon,
  Cancel01Icon,
} from "hugeicons-react";
import { ROUTES } from "@/constants/routes";

const brands = [
  { name: "babelito", label: "Babelito" },
  { name: "spa", label: "SPA" },
  { name: "random", label: "Random" },
  { name: "jactans", label: "Jactans" },
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
  const { query, setQuery } = useSearch();
  const isSearching = query.trim().length > 0;
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPos({ x, y });
  };

  const handleMouseLeave = () => {
    setBgPos({ x: 50, y: 50 });
  };

  const filteredProducts = sampleProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.tipo.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <PublicLayout>
      <div
        className={
          isSearching
            ? "pointer-events-none opacity-20 blur-[2px] transition-all duration-500"
            : ""
        }
      >
        <section className="w-full px-4 pb-10 pt-10 md:px-12 lg:px-16 lg:pt-12">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative mx-auto w-full max-w-[98vw] overflow-hidden rounded-[2rem] px-6 py-14 text-center md:px-14 md:py-20 lg:px-20 lg:py-24"
            style={{
              background: `radial-gradient(ellipse 120% 80% at ${bgPos.x}% ${bgPos.y}%, #4da0c9 0%, #2b7da5 35%, #1e4a6b 70%, #152e44 100%)`,
              transition: "background 0.6s ease-out",
            }}
          >
            <motion.div
              animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            <motion.div
              animate={{ y: [0, 15, 0], scale: [1, 1.08, 1] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/5 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-6xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6 inline-block rounded-full bg-white/15 px-7 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm"
              >
                Exclusivo Mayoristas
              </motion.span>

              <h2
                className="text-4xl font-extrabold leading-[1.15] text-white md:text-6xl lg:text-[5.5rem]"
                style={{
                  fontFamily:
                    "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  wordSpacing: "0.15em",
                }}
              >
                Hacé crecer tu negocio
                <br />
                <span className="text-white/90">con los mejores precios</span>
              </h2>

              <p
                className="mx-auto mt-8 w-full text-lg leading-relaxed text-white/85 md:text-xl lg:text-2xl"
                style={{
                  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                }}
              >
                <strong className="font-semibold text-white">
                  Venta mayorista, siempre.
                </strong>{" "}
                Registrate como cliente verificado y accedé al catálogo completo
                con{" "}
                <strong className="font-semibold text-white">
                  precios exclusivos
                </strong>
                , historial de pedidos, seguimiento de envíos y gestión integral
                desde tu panel personalizado.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-5 text-sm text-white/75"
              >
                <span className="flex items-center gap-2.5">
                  <CheckmarkCircle01Icon className="size-5 text-white" />
                  Precios mayoristas
                </span>
                <span className="flex items-center gap-2.5">
                  <CheckmarkCircle01Icon className="size-5 text-white" />
                  Historial de pedidos
                </span>
                <span className="flex items-center gap-2.5">
                  <CheckmarkCircle01Icon className="size-5 text-white" />
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
                    className="mt-10 gap-3 rounded-[2rem] bg-[#b7102a] px-10 text-base font-bold text-white shadow-xl hover:bg-[#a00f25] hover:shadow-2xl"
                    style={{
                      fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                    }}
                  >
                    Crear mi cuenta
                    <Login01Icon className="size-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="w-full px-6 py-12 md:px-20 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2
              className="text-[1.75rem] font-extrabold text-[#161d16] md:text-[2.25rem]"
              style={{
                fontFamily:
                  "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Nuestras Marcas
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-10 md:gap-14"
          >
            {brands.map((brand) => {
              const isSpa = brand.name === "spa";

              return (
                <motion.div
                  key={brand.name}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex cursor-pointer flex-col items-center gap-3"
                >
                  <div
                    className={`flex items-center justify-center rounded-[1.5rem] bg-white shadow-[0_8px_32px_rgba(29,53,87,0.08)] transition-shadow duration-300 hover:shadow-[0_12px_48px_rgba(29,53,87,0.14)] ${
                      isSpa ? "h-28 w-44 p-4" : "h-28 w-48 p-5"
                    }`}
                  >
                    <Image
                      src={`/assets/images/logos/${brand.name}.svg`}
                      alt={brand.label}
                      width={isSpa ? 160 : 170}
                      height={isSpa ? 64 : 64}
                      className="object-contain"
                    />
                  </div>
                  <span
                    className="text-sm font-bold text-[#161d16]"
                    style={{
                      fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                    }}
                  >
                    {brand.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        <section className="w-full px-6 pb-16 md:px-20 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex items-end justify-between"
          >
            <div>
              <h2
                className="text-[1.75rem] font-extrabold text-[#161d16] md:text-[2.25rem]"
                style={{
                  fontFamily:
                    "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Explorá nuestro catálogo
              </h2>
            </div>
            <Link href={ROUTES.CATALOG}>
              <Button variant="ghost" size="lg" className="gap-2 text-base">
                Ver todos
                <ArrowRight01Icon className="size-5" />
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
      </div>

      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-background/80 pt-20 backdrop-blur-sm"
          >
            <div className="w-full px-6 py-12 md:px-20 lg:px-32">
              <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2
                      className="text-[1.75rem] font-bold text-[#161d16]"
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {filteredProducts.length > 0
                        ? `${filteredProducts.length} producto${filteredProducts.length > 1 ? "s" : ""} encontrado${filteredProducts.length > 1 ? "s" : ""}`
                        : "Sin resultados"}
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    onClick={() => setQuery("")}
                  >
                    <Cancel01Icon className="size-6" />
                  </Button>
                </div>

                {filteredProducts.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                  >
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        {...product}
                        showPrice={false}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <p
                      className="text-lg text-[#161d16]/70"
                      style={{
                        fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                      }}
                    >
                      No encontramos productos que coincidan con &quot;{query}
                      &quot;
                    </p>
                    <p
                      className="mt-2 text-sm text-[#161d16]/50"
                      style={{
                        fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                      }}
                    >
                      Probá con otro término de búsqueda
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PublicLayout>
  );
}
