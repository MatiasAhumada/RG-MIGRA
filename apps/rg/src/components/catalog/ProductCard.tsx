import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart01Icon } from "hugeicons-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  name: string;
  sku: string;
  price: number;
  imgUrl?: string;
  tipo?: string;
  category?: string;
  showPrice?: boolean;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
}

export function ProductCard({
  name,
  sku,
  price,
  imgUrl,
  tipo,
  category,
  showPrice = true,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price);

  const borderColor =
    category === "Pañales" || category === "Alimentación"
      ? "border-t-vanilla-cream-300"
      : category === "Higiene" || category === "Cuidado"
        ? "border-t-sage-green"
        : "border-t-hunter-green";

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onViewDetails}
      className="h-full cursor-pointer"
    >
      <Card
        elevation="elevated"
        className={`group h-full overflow-hidden rounded-2xl border-t-4 ${borderColor} transition-all duration-300 hover:shadow-elevated`}
      >
        <div className="relative aspect-square overflow-hidden bg-vanilla-cream-700">
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <div className="flex size-20 items-center justify-center rounded-2xl bg-muted">
                <span className="text-3xl font-bold text-muted-foreground/30">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}

          {(category ?? tipo) && (
            <span className="absolute top-3 left-3 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
              {category ?? tipo}
            </span>
          )}
        </div>

        <CardContent className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-col gap-1">
            <h3 className="line-clamp-2 text-base font-semibold text-foreground group-hover:text-hunter-green">
              {name}
            </h3>
            <span className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">
              SKU: {sku}
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between gap-3">
            {showPrice && (
              <span className="text-xl font-bold text-vanilla-cream-300">
                {formattedPrice}
              </span>
            )}
            {!showPrice && <span />}
            {onAddToCart && (
              <Button
                variant="primary"
                size="icon-sm"
                rounded="full"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart();
                }}
              >
                <ShoppingCart01Icon className="size-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
