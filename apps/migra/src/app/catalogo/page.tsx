"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout";
import { ProductCard } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Search01Icon } from "hugeicons-react";
import { productoService } from "@/services";
import { clientErrorHandler } from "@/utils/handlers/clientHandler";
import { useDataQuery } from "@/hooks/useDataQuery";
import type { ProductoWithRelations } from "@/types/producto.types";

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<number>();

  const { data: productos, isLoading } = useDataQuery<ProductoWithRelations[]>({
    fetcher: () =>
      productoService.findAllActive(
        debouncedSearch,
        undefined,
        activeCategoryId,
      ),
    deps: [debouncedSearch, activeCategoryId],
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    const timeout = setTimeout(() => {
      setDebouncedSearch(value);
    }, 500);

    return () => clearTimeout(timeout);
  };

  const allCategories = Array.from(
    new Map(
      (productos || []).map((p) => [p.categoria.id, p.categoria]),
    ).values(),
  );

  const categories = [
    { id: undefined, name: "Todos" },
    ...allCategories.map((c) => ({ id: c.id, name: c.name })),
  ];

  return (
    <PublicLayout>
      <div className="w-full px-6 py-16 md:px-20 lg:px-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1
            className="text-[1.75rem] font-extrabold text-[#161d16] md:text-[2.25rem]"
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Catálogo Completo
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-8"
        >
          <div className="relative max-w-md">
            <Search01Icon className="absolute top-4 left-4 size-5 text-[#3d4a3d]/50" />
            <Input
              placeholder="Buscar producto, tipo o SKU..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="h-12 pl-12 text-base"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-10 flex gap-3 overflow-x-auto pb-2"
        >
          {categories.map((category) => (
            <button
              key={category.id ?? "todos"}
              onClick={() => setActiveCategoryId(category.id)}
              className={`shrink-0 cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${
                activeCategoryId === category.id
                  ? "bg-[#2b6485] text-white shadow-lg"
                  : "bg-[#f3fcf0]/60 text-[#3d4a3d] hover:bg-[#f3fcf0]"
              }`}
              style={{
                fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
              }}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {(productos || []).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                tipo={product.categoria.name}
                sku={product.sku}
                price={product.price}
                imgUrl={product.imgUrl}
                variantes={product.variantes}
                sinStock={product.sinStock}
              />
            </motion.div>
          ))}
        </div>

        {(productos || []).length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p
              className="text-lg text-[#3d4a3d]"
              style={{
                fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
              }}
            >
              No se encontraron productos con esos criterios.
            </p>
          </motion.div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <span className="size-6 animate-spin rounded-full border-2 border-[#2b6485]/30 border-t-[#2b6485]" />
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
