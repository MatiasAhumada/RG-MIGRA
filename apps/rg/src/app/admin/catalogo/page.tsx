"use client";

import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout";
import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  GridIcon,
  ArrowRight01Icon,
  EyeIcon,
  Link01Icon,
} from "hugeicons-react";

const categories = [
  { name: "Pañales", count: 24, brands: "Babelito, Bampe, Petit Bateau" },
  { name: "Higiene", count: 18, brands: "Johnson's, Mustela, Bioderma" },
  { name: "Alimentación", count: 15, brands: "Nestlé, Aptamil, Milupa" },
  { name: "Accesorios", count: 32, brands: "Chicco, NUK, Philips Avent" },
  { name: "Cuidado", count: 12, brands: "Weleda, Burt's Bees, Mustela" },
  { name: "Textil", count: 28, brands: "Carter's, Zara Baby, H&M" },
];

const topProducts = [
  {
    id: 1,
    name: "Pack Pañales Premium Talle M",
    brand: "Babelito",
    category: "Pañales",
    sku: "PAN-PRE-M",
    views: 1240,
  },
  {
    id: 2,
    name: "Toallitas Húmedas x100",
    brand: "Johnson's",
    category: "Higiene",
    sku: "TOH-100",
    views: 980,
  },
  {
    id: 3,
    name: "Leche Infantil Fórmula 900g",
    brand: "Nestlé",
    category: "Alimentación",
    sku: "LEI-FOR-900",
    views: 870,
  },
  {
    id: 4,
    name: "Biberón Anticólicos 270ml",
    brand: "Philips Avent",
    category: "Accesorios",
    sku: "BIB-ANT-270",
    views: 650,
  },
];

export default function AdminCatalogoPage() {
  return (
    <AppLayout variant="admin">
      <PageHeader
        title="Catálogo Público"
        description="Vista previa del catálogo visible para clientes"
        action={
          <Link href="/catalogo">
            <Button variant="outline" size="sm" className="gap-2">
              <Link01Icon className="size-4" />
              Ver Catálogo Público
            </Button>
          </Link>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-8"
      >
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Categorías del Catálogo
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {cat.brands}
                    </p>
                  </div>
                  <span className="rounded-full text-vanilla-cream-200/15 px-3 py-1 text-xs font-bold text-vanilla-cream-300">
                    {cat.count}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-8"
      >
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Productos Más Vistos
        </h2>
        <Card className="p-0 overflow-hidden">
          <div className="hidden gap-4 border-b border-border/10 px-6 py-4 md:grid md:grid-cols-12 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <div className="col-span-4">Producto</div>
            <div className="col-span-2">Marca</div>
            <div className="col-span-2">Categoría</div>
            <div className="col-span-2">SKU</div>
            <div className="col-span-2 text-right">Visualizaciones</div>
          </div>

          {topProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.05, duration: 0.4 }}
              className="flex flex-col gap-3 border-b border-border/5 px-6 py-4 transition-colors hover:bg-vanilla-cream-600/30 last:border-b-0 md:grid md:grid-cols-12 md:items-center md:gap-4"
            >
              <div className="col-span-4">
                <p className="font-semibold text-foreground">{product.name}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">{product.brand}</p>
              </div>
              <div className="col-span-2">
                <span className="rounded-full bg-sage-green-800 px-3 py-1 text-xs font-medium text-sage-green-400">
                  {product.category}
                </span>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-mono text-muted-foreground">
                  {product.sku}
                </p>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {product.views.toLocaleString("es-AR")}
                </span>
                <Button size="icon-xs" variant="outline">
                  <EyeIcon className="size-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </Card>
      </motion.div>
    </AppLayout>
  );
}
