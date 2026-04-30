"use client";

import { useState, useRef, useEffect, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PublicLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/common";
import { useSearch } from "@/context/search-context";
import { useAuth } from "@/context/auth-context";
import {
  ArrowRight01Icon,
  Login01Icon,
  CheckmarkCircle01Icon,
  Cancel01Icon,
  GridIcon,
} from "hugeicons-react";
import { ROUTES } from "@/constants/routes";
import { productoService } from "@/services";
import { clientErrorHandler } from "@/utils/handlers/clientHandler";
import type { ProductoWithRelations } from "@/types/producto.types";

const brands = [
  { name: "babelito", label: "Babelito" },
  { name: "spa", label: "SPA" },
  { name: "random", label: "Random" },
  { name: "jactans", label: "Jactans" },
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
  const { isAuthenticated, isClient } = useAuth();
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [productos, setProductos] = useState<ProductoWithRelations[]>([]);
  const [searchResults, setSearchResults] = useState<ProductoWithRelations[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  const isSearching = query.trim().length > 0;

  useEffect(() => {
    loadProductos();
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      const timeout = setTimeout(() => {
        searchProductos(query);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const loadProductos = async () => {
    try {
      setIsLoading(true);
      const data = await productoService.findAllActive();
      setProductos(data);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchProductos = async (searchQuery: string) => {
    try {
      const data = await productoService.findAllActive(searchQuery);
      setSearchResults(data);
    } catch (error) {
      clientErrorHandler(error);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPos({ x, y });
  };

  const handleMouseLeave = () => {
    setBgPos({ x: 50, y: 50 });
  };

  const displayProducts = isSearching ? searchResults : productos.slice(0, 8);

  return (
    <PublicLayout>
      <motion.div
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
                {!isAuthenticated ? (
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
                ) : isClient ? (
                  <Link href={ROUTES.DASHBOARD}>
                    <Button
                      size="lg"
                      className="mt-10 gap-3 rounded-[2rem] bg-white/15 px-10 text-base font-bold text-white shadow-xl hover:bg-white/25 backdrop-blur-sm"
                      style={{
                        fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                      }}
                    >
                      Ir a Mi Panel
                      <GridIcon className="size-5" />
                    </Button>
                  </Link>
                ) : null}
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

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <span className="size-8 animate-spin rounded-full border-2 border-[#2b6485]/30 border-t-[#2b6485]" />
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  tipo={product.categoria.name}
                  sku={product.sku}
                  price={product.price}
                  imgUrl={product.imgUrl || ""}
                  sinStock={product.sinStock}
                />
              ))}
            </motion.div>
          )}
        </section>
      </motion.div>

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
                      {searchResults.length > 0
                        ? `${searchResults.length} producto${searchResults.length > 1 ? "s" : ""} encontrado${searchResults.length > 1 ? "s" : ""}`
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

                {searchResults.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                  >
                    {searchResults.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        tipo={product.categoria.name}
                        sku={product.sku}
                        price={product.price}
                        imgUrl={product.imgUrl || ""}
                        sinStock={product.sinStock}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <p className="text-lg text-[#161d16]/70">
                      No encontramos productos que coincidan con &quot;{query}
                      &quot;
                    </p>
                    <p className="mt-2 text-sm text-[#161d16]/50">
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
