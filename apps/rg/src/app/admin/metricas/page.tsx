"use client";

import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout";
import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import {
  Chart01Icon,
  Analytics01Icon,
  Group01Icon,
  ShoppingCart01Icon,
  Package01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "hugeicons-react";

const monthlyStats = [
  {
    label: "Ventas del Mes",
    value: "$4.2M",
    change: "+18%",
    trend: "up" as const,
    icon: Chart01Icon,
  },
  {
    label: "Clientes Nuevos",
    value: "12",
    change: "+4",
    trend: "up" as const,
    icon: Group01Icon,
  },
  {
    label: "Pedidos Completados",
    value: "89",
    change: "+23%",
    trend: "up" as const,
    icon: ShoppingCart01Icon,
  },
  {
    label: "Productos Más Vendidos",
    value: "Pañales",
    change: "-2%",
    trend: "down" as const,
    icon: Package01Icon,
  },
];

const topSellers = [
  { rank: 1, brand: "Babelito", sales: "$890K", percentage: "32%" },
  { rank: 2, brand: "Johnson's", sales: "$620K", percentage: "22%" },
  { rank: 3, brand: "Nestlé", sales: "$480K", percentage: "17%" },
  { rank: 4, brand: "Philips Avent", sales: "$350K", percentage: "13%" },
  { rank: 5, brand: "Mustela", sales: "$210K", percentage: "8%" },
];

const categoryPerformance = [
  {
    category: "Pañales",
    revenue: "$1.2M",
    growth: "+15%",
    trend: "up" as const,
  },
  {
    category: "Higiene",
    revenue: "$680K",
    growth: "+8%",
    trend: "up" as const,
  },
  {
    category: "Alimentación",
    revenue: "$520K",
    growth: "-3%",
    trend: "down" as const,
  },
  {
    category: "Accesorios",
    revenue: "$410K",
    growth: "+22%",
    trend: "up" as const,
  },
  {
    category: "Textil",
    revenue: "$290K",
    growth: "+12%",
    trend: "up" as const,
  },
];

export default function AdminMetricasPage() {
  return (
    <AppLayout variant="admin">
      <PageHeader
        title="Métricas"
        description="Análisis de rendimiento y estadísticas"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {monthlyStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
            >
              <Card
                className={`gap-4 p-6 border-t-4 ${stat.label === "Ventas del Mes" ? "border-t-sage-green" : stat.label === "Clientes Nuevos" ? "border-t-vanilla-cream-300" : stat.label === "Pedidos Completados" ? "border-t-primary" : "border-t-blushed-brick"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-sage-green-800 text-sage-green-400">
                    <Icon className="size-6" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" ? "text-sage-green-400" : "text-error"}`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUp01Icon className="size-3" />
                    ) : (
                      <ArrowDown01Icon className="size-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <Analytics01Icon className="size-5 text-sage-green-400" />
              <h2 className="text-lg font-bold text-foreground">
                Top Marcas por Ventas
              </h2>
            </div>
            <div className="space-y-4">
              {topSellers.map((seller, index) => (
                <motion.div
                  key={seller.rank}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex size-8 items-center justify-center rounded-full bg-accent-warm-light text-vanilla-cream-300 text-xs font-bold">
                      {seller.rank}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">
                        {seller.brand}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {seller.percentage} del total
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-foreground">
                    {seller.sales}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <Package01Icon className="size-5 text-vanilla-cream-300" />
              <h2 className="text-lg font-bold text-foreground">
                Rendimiento por Categoría
              </h2>
            </div>
            <div className="space-y-4">
              {categoryPerformance.map((cat, index) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-foreground">
                      {cat.category}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {cat.revenue}
                    </p>
                  </div>
                  <span
                    className={`flex items-center gap-1 text-sm font-medium ${cat.trend === "up" ? "text-sage-green-400" : "text-error"}`}
                  >
                    {cat.trend === "up" ? (
                      <ArrowUp01Icon className="size-3" />
                    ) : (
                      <ArrowDown01Icon className="size-3" />
                    )}
                    {cat.growth}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
}
