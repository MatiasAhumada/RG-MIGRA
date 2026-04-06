"use client";

import { PublicLayout } from "@/components/layout";
import {
  HeroSection,
  ProductCard,
  FilterChipsGroup,
} from "@/components/catalog";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const containerAnim = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const floatAnim = {
  animate: { y: [0, -10, 0] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

const CATEGORIAS = [
  { id: "todas", label: "Todas", count: 24 },
  { id: "pañales", label: "Pañales", count: 8 },
  { id: "higiene", label: "Higiene", count: 6 },
  { id: "accesorios", label: "Accesorios", count: 10 },
];

const PRODUCTOS_DEMO = [
  {
    id: "1",
    name: "Pack Pañales Premium Talle M",
    sku: "PAN-PRE-M",
    price: 15800,
    category: "Pañales",
  },
  {
    id: "2",
    name: "Toallitas Húmedas x100",
    sku: "TOH-100",
    price: 4200,
    category: "Higiene",
  },
  {
    id: "3",
    name: "Leche Infantil Fórmula 900g",
    sku: "LEI-FOR-900",
    price: 12500,
    category: "Alimentación",
  },
  {
    id: "4",
    name: "Biberón Anticólicos 270ml",
    sku: "BIB-ANT-270",
    price: 6800,
    category: "Accesorios",
  },
  {
    id: "5",
    name: "Crema Hidratante Bebé 200g",
    sku: "CRH-BEB-200",
    price: 5400,
    category: "Cuidado",
  },
  {
    id: "6",
    name: "Chupete Silicona 6-18m",
    sku: "CHU-SIL-618",
    price: 3200,
    category: "Accesorios",
  },
  {
    id: "7",
    name: "Pack Toallas de Baño x3",
    sku: "TOB-BAO-3",
    price: 8900,
    category: "Textil",
  },
  {
    id: "8",
    name: "Talco Puder Bebé 300g",
    sku: "TAL-PUD-300",
    price: 3800,
    category: "Cuidado",
  },
];

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerAnim}
        className="bg-vanilla-cream-500/30 px-6 py-14 md:px-12 md:py-20"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <motion.div variants={itemAnim} className="flex flex-col gap-3">
            <span className="text-base font-bold uppercase tracking-[0.2em] text-blushed-brick">
              Catálogo
            </span>
            <h2 className="text-3xl font-black tracking-tight text-foreground [-0.03em] md:text-5xl">
              Productos <span className="text-blushed-brick">Destacados</span>
            </h2>
            <p className="text-lg font-medium text-hunter-green-200">
              Explorá nuestra selección de productos más solicitados
            </p>
          </motion.div>

          <motion.div variants={itemAnim}>
            <FilterChipsGroup chips={CATEGORIAS} activeId="todas" />
          </motion.div>

          <motion.div
            variants={containerAnim}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {PRODUCTOS_DEMO.map((producto, i) => (
              <motion.div key={producto.id} variants={itemAnim} custom={i}>
                <ProductCard
                  name={producto.name}
                  sku={producto.sku}
                  price={producto.price}
                  category={producto.category}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerAnim}
        className="bg-background px-6 py-16 md:px-12"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-10 text-center">
          <motion.span
            variants={itemAnim}
            className="text-base font-bold uppercase tracking-[0.2em] text-blushed-brick"
          >
            Ventajas
          </motion.span>
          <motion.h2
            variants={itemAnim}
            className="text-3xl font-black tracking-tight text-foreground [-0.03em] md:text-5xl"
          >
            ¿Por qué <span className="text-blushed-brick">elegirnos</span>?
          </motion.h2>
          <motion.div
            variants={containerAnim}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            <BenefitCard
              icon="🚚"
              title="Envíos a Todo el País"
              description="Logística eficiente para que tus productos lleguen a tiempo."
              accent="vanilla"
            />
            <BenefitCard
              icon="⭐"
              title="Calidad Garantizada"
              description="Productos seleccionados bajo los más altos estándares."
              accent="sage"
            />
            <BenefitCard
              icon="🤝"
              title="Atención Personalizada"
              description="Un equipo dedicado para acompañar tu crecimiento."
              accent="hunter"
            />
          </motion.div>
        </div>
      </motion.section>
    </PublicLayout>
  );
}

function BenefitCard({
  icon,
  title,
  description,
  accent = "vanilla",
}: {
  icon: string;
  title: string;
  description: string;
  accent?: "vanilla" | "sage" | "hunter";
}) {
  const borderClass =
    accent === "vanilla"
      ? "border-l-vanilla-cream-300"
      : accent === "sage"
        ? "border-l-sage-green"
        : "border-l-hunter-green";
  const bgClass =
    accent === "vanilla"
      ? "bg-vanilla-cream-500/40"
      : accent === "sage"
        ? "bg-sage-green-800/40"
        : "bg-hunter-green/5";

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        elevation="elevated"
        className={`group flex flex-col items-center gap-4 rounded-2xl border-l-4 p-8 transition-all duration-300 hover:shadow-elevated ${borderClass} ${bgClass}`}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="flex size-14 items-center justify-center rounded-2xl bg-card text-3xl shadow-sm"
        >
          {icon}
        </motion.div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-center text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}
