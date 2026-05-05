"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout";
import { ProductCard } from "@/components/common";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search01Icon } from "hugeicons-react";
import { productoService, marcaService } from "@/services";
import { clientErrorHandler } from "@/utils/handlers/clientHandler";
import { useDataQuery } from "@/hooks/useDataQuery";
import type { ProductoWithRelations } from "@/types/producto.types";
import type { MarcaWithCategorias } from "@/types";

function CatalogContent() {
  const searchParams = useSearchParams();
  const marcaParam = searchParams.get("marca");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterMarcaId, setFilterMarcaId] = useState(marcaParam || "all");
  const [filterCategoriaId, setFilterCategoriaId] = useState("all");
  const [filterSubcategoriaId, setFilterSubcategoriaId] = useState("all");
  const [marcas, setMarcas] = useState<MarcaWithCategorias[]>([]);

  useEffect(() => {
    if (marcaParam) {
      setFilterMarcaId(marcaParam);
      setFilterCategoriaId("all");
      setFilterSubcategoriaId("all");
    }
  }, [marcaParam]);

  useEffect(() => {
    loadMarcas();
  }, []);

  const loadMarcas = async () => {
    try {
      const data = await marcaService.findAll(1);
      setMarcas(data);
    } catch (error) {
      clientErrorHandler(error);
    }
  };

  const { data: productos, isLoading } = useDataQuery<ProductoWithRelations[]>({
    fetcher: () =>
      productoService.findAllActive(
        debouncedSearch,
        1,
        filterMarcaId !== "all" ? Number(filterMarcaId) : undefined,
        filterCategoriaId !== "all" ? Number(filterCategoriaId) : undefined,
        filterSubcategoriaId !== "all"
          ? Number(filterSubcategoriaId)
          : undefined,
      ),
    deps: [
      debouncedSearch,
      filterMarcaId,
      filterCategoriaId,
      filterSubcategoriaId,
    ],
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    const timeout = setTimeout(() => {
      setDebouncedSearch(value);
    }, 500);

    return () => clearTimeout(timeout);
  };

  const filterMarca = marcas.find((m) => m.id === Number(filterMarcaId));
  const filterCategorias = filterMarca?.categorias || [];
  const filterCategoria = filterCategorias.find(
    (c) => c.id === Number(filterCategoriaId),
  );
  const filterSubcategorias = filterCategoria?.subcategorias || [];

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
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Select
            value={filterMarcaId}
            onValueChange={(value) => {
              setFilterMarcaId(value);
              setFilterCategoriaId("all");
              setFilterSubcategoriaId("all");
            }}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Todas las marcas" />
            </SelectTrigger>
            <SelectContent position="popper" side="bottom" align="start">
              <SelectItem value="all">Todas las marcas</SelectItem>
              {marcas.map((marca) => (
                <SelectItem key={marca.id} value={String(marca.id)}>
                  {marca.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filterCategoriaId}
            onValueChange={(value) => {
              setFilterCategoriaId(value);
              setFilterSubcategoriaId("all");
            }}
            disabled={filterMarcaId === "all"}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent position="popper" side="bottom" align="start">
              <SelectItem value="all">Todas las categorías</SelectItem>
              {filterCategorias.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filterSubcategoriaId}
            onValueChange={(value) => setFilterSubcategoriaId(value)}
            disabled={filterCategoriaId === "all"}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Todas las subcategorías" />
            </SelectTrigger>
            <SelectContent position="popper" side="bottom" align="start">
              <SelectItem value="all">Todas las subcategorías</SelectItem>
              {filterSubcategorias.map((sub) => (
                <SelectItem key={sub.id} value={String(sub.id)}>
                  {sub.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <PublicLayout>
          <div className="flex min-h-screen items-center justify-center">
            <span className="size-8 animate-spin rounded-full border-2 border-[#2b6485]/30 border-t-[#2b6485]" />
          </div>
        </PublicLayout>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
