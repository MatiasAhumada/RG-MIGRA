import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart01Icon } from "hugeicons-react";

interface ProductCardProps {
  id: string | number;
  name: string;
  tipo: string;
  sku: string;
  price: number;
  imgUrl: string;
  className?: string;
  showPrice?: boolean;
}

export function ProductCard({
  id,
  name,
  tipo,
  sku,
  price,
  imgUrl,
  className,
  showPrice = true,
}: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("group flex h-full", className)}
    >
      <Card className="relative flex h-full w-full flex-col overflow-hidden p-0 transition-all duration-300 hover:shadow-[0_12px_48px_rgba(29,53,87,0.12)]">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-gradient-to-br from-cerulean-400 to-cerulean-600">
          <Image
            src={imgUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-base font-medium text-on-surface-variant/70">
              {tipo}
            </span>
            <h3 className="text-lg font-semibold leading-snug text-on-surface line-clamp-2">
              {name}
            </h3>
            <span className="text-sm text-on-surface-variant/50">
              SKU: {sku}
            </span>
          </div>

          <div className="mt-auto">
            {showPrice ? (
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">
                  {formattedPrice}
                </span>
                <Button
                  size="icon-sm"
                  className="gradient-primary text-white shadow-ambient"
                >
                  <ShoppingCart01Icon className="size-5" />
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  size="lg"
                  className="w-full bg-cerulean-500 text-base font-bold text-white hover:bg-cerulean-400 shadow-sm"
                >
                  Ver precio
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
