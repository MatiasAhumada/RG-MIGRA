"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout";
import { PageHeader, ProductCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GenericModal } from "@/components/common";
import {
  Add01Icon,
  Search01Icon,
  Edit02Icon,
  Delete01Icon,
} from "hugeicons-react";

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
];

export default function AdminProductosPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout variant="admin">
      <PageHeader
        title="Productos"
        description="Gestión del catálogo de productos"
        action={
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Add01Icon className="size-5" />
            Nuevo Producto
          </Button>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-6"
      >
        <div className="relative max-w-sm">
          <Search01Icon className="absolute top-3.5 left-4 size-4 text-on-surface-variant/50" />
          <Input
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {sampleProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            <div className="group relative">
              <ProductCard {...product} />
              <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="icon-xs"
                  variant="outline"
                  className="bg-surface-container-lowest"
                >
                  <Edit02Icon className="size-3" />
                </Button>
                <Button
                  size="icon-xs"
                  variant="outline"
                  className="bg-surface-container-lowest text-destructive"
                >
                  <Delete01Icon className="size-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <GenericModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Nuevo Producto"
        size="md"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-label-sm text-on-surface">
              Nombre del Producto
            </label>
            <Input placeholder="Ej: Pack Pañales Premium Talle M" />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-label-sm text-on-surface">Tipo</label>
              <Input placeholder="Ej: Pañales" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-sm text-on-surface">SKU</label>
              <Input placeholder="Ej: PAN-PRE-M" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-label-sm text-on-surface">Precio</label>
            <Input type="number" placeholder="0.00" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-label-sm text-on-surface">
              URL de Imagen
            </label>
            <Input placeholder="https://..." />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>
            Guardar Producto
          </Button>
        </div>
      </GenericModal>
    </DashboardLayout>
  );
}
