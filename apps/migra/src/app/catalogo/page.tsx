"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout";
import { ProductCard } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search01Icon, FilterIcon } from "hugeicons-react";

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
  {
    id: 7,
    name: "Pack Toallas de Baño x3",
    tipo: "Textil",
    sku: "TOB-BAO-3",
    price: 8900,
    imgUrl:
      "https://images.unsplash.com/photo-1627916560298-0227d0754b40?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Talco Puder Bebé 300g",
    tipo: "Cuidado",
    sku: "TAL-PUD-300",
    price: 3800,
    imgUrl:
      "https://images.unsplash.com/photo-1584693786687-3e4b0a0e3e3e?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 9,
    name: "Mochila Pañalera Premium",
    tipo: "Accesorios",
    sku: "MOC-PRE-001",
    price: 18500,
    imgUrl:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop",
  },
];

const categories = [
  "Todos",
  "Pañales",
  "Higiene",
  "Alimentación",
  "Accesorios",
  "Cuidado",
  "Textil",
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.tipo.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "Todos" || product.tipo === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout>
      <div className="w-full px-6 py-12 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <span className="text-label-sm text-secondary">
            Catálogo Completo
          </span>
          <h1 className="mt-2 text-headline-md text-on-surface">
            Todos los productos
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="relative flex-1 md:max-w-sm">
            <Search01Icon className="absolute top-3.5 left-4 size-4 text-on-surface-variant/50" />
            <Input
              placeholder="Buscar producto, tipo o SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2 md:hidden">
            <FilterIcon className="size-4" />
            Filtros
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-8 flex gap-2 overflow-x-auto pb-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "gradient-primary text-on-primary"
                  : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <ProductCard {...product} showPrice={false} />
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="text-lg text-on-surface-variant">
              No se encontraron productos con esos criterios.
            </p>
          </motion.div>
        )}
      </div>
    </PublicLayout>
  );
}
