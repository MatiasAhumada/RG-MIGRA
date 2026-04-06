"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout";
import { ProductCard } from "@/components/catalog";
import { Input } from "@/components/ui/input";
import { Search01Icon } from "hugeicons-react";

const sampleProducts = [
  {
    id: 1,
    name: "Pack Pañales Premium Talle M x50",
    tipo: "Pañales",
    sku: "PAN-PRE-M50",
    price: 15800,
    imgUrl:
      "https://images.unsplash.com/photo-1594125345722-e6e726a33a79?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Toallitas Húmedas Bebé x100",
    tipo: "Higiene",
    sku: "TOH-BEB-100",
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
    tipo: "Alimentación",
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
    name: "Chupete Silicona Anatómico 6-18m",
    tipo: "Accesorios",
    sku: "CHU-SIL-618",
    price: 3200,
    imgUrl:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Toalla de Baño Bebé con Capucha x3",
    tipo: "Textil",
    sku: "TOB-CAP-3",
    price: 8900,
    imgUrl:
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Talco Puder Bebé Sin Polvo 300g",
    tipo: "Cuidado",
    sku: "TAL-PUD-300",
    price: 3800,
    imgUrl:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 9,
    name: "Mochila Pañalera Impermeable Premium",
    tipo: "Accesorios",
    sku: "MOC-IMP-001",
    price: 18500,
    imgUrl:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=400&fit=crop",
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

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
      <div className="w-full px-6 py-16 md:px-20 lg:px-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <span className="text-label-sm text-hunter-green">
            Catálogo Completo
          </span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground [-0.02em]">
            Todos los productos
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-8"
        >
          <div className="relative max-w-md">
            <Search01Icon className="absolute top-3.5 left-3 size-4 text-muted-foreground/50" />
            <Input
              placeholder="Buscar producto, tipo o SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
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
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${
                activeCategory === category
                  ? "bg-accent-cool text-white shadow-float"
                  : "bg-muted text-muted-foreground hover:bg-muted-high"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {filteredProducts.map((product, index) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard {...product} showPrice={false} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="text-lg text-muted-foreground">
              No se encontraron productos con esos criterios.
            </p>
          </motion.div>
        )}
      </div>
    </PublicLayout>
  );
}
