import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export function HeroSection({
  title = "Productos de Calidad al Mejor Precio",
  subtitle = "Somos Robles Gonzalo, tu socio confiable en distribución mayorista. Explorá nuestro catálogo y descubrí la variedad que tu negocio necesita.",
  ctaText = "Explorar Catálogo",
  ctaHref = "/catalogo",
  secondaryCtaText = "Contactanos",
  secondaryCtaHref = "/contacto",
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-vanilla-cream-500 via-background to-vanilla-cream-600 px-6 py-20 md:px-12 md:py-28 lg:py-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 h-96 w-96 rounded-full bg-vanilla-cream-300/40 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-sage-green/25 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 left-0 h-64 w-64 rounded-full bg-blushed-brick/10 blur-3xl"
        />
      </motion.div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-10 md:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-4xl flex-col gap-8"
        >
          <div className="flex items-center gap-2">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="inline-block h-1.5 rounded-full bg-gradient-to-r from-blushed-brick to-yellow-green-400"
            />
            <span className="text-base font-bold uppercase tracking-[0.2em] text-blushed-brick">
              Distribución Mayorista
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-black leading-[1.05] tracking-tight text-foreground [-0.03em] md:text-7xl lg:text-8xl"
          >
            Productos de{" "}
            <span className="bg-gradient-to-r from-blushed-brick via-hunter-green to-sage-green bg-clip-text text-transparent">
              Calidad
            </span>
            <br />
            al Mejor Precio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-2xl text-xl font-medium leading-relaxed text-hunter-green-200 md:text-2xl"
          >
            Somos Robles Gonzalo, tu socio confiable en distribución mayorista.{" "}
            <span className="text-blushed-brick font-semibold">
              Explorá nuestro catálogo
            </span>{" "}
            y descubrí la variedad que tu negocio necesita.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button variant="destructive" size="xl" rounded="full" asChild>
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
          {secondaryCtaText && secondaryCtaHref && (
            <Button variant="secondary" size="xl" rounded="full" asChild>
              <Link href={secondaryCtaHref}>{secondaryCtaText}</Link>
            </Button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-4 flex flex-wrap items-center gap-10 md:gap-14"
        >
          <StatDisplay value="500+" label="Productos" delay={0.8} />
          <StatDisplay value="100+" label="Clientes" delay={0.9} />
          <StatDisplay value="10+" label="Años" delay={1.0} />
        </motion.div>
      </div>
    </section>
  );
}

function StatDisplay({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <span className="text-3xl font-black text-blushed-brick">{value}</span>
      <span className="text-sm font-medium text-hunter-green-300">{label}</span>
    </motion.div>
  );
}
