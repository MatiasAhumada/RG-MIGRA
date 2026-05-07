import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart01Icon } from "hugeicons-react";
import { formatCurrency } from "@/utils/formatters";
import { ProductImageCarousel } from "@/components/common/ProductImageCarousel";
import type { ProductoVariante } from "@prisma/client";

interface ProductCardProps {
  id: string | number;
  name: string;
  tipo: string;
  sku: string;
  price: number;
  imgUrl?: string | null;
  variantes?: ProductoVariante[];
  className?: string;
  showPrice?: boolean;
  sinStock?: boolean;
  onClick?: () => void;
  carouselIndex?: number;
  onCarouselIndexChange?: (index: number) => void;
  pauseCarousel?: boolean;
}

const PLACEHOLDER_IMAGE = "/assets/images/placeholder-product.png";

export function ProductCard({
  id,
  name,
  tipo,
  sku,
  price,
  imgUrl,
  variantes = [],
  className,
  showPrice: showPriceProp,
  sinStock = false,
  onClick,
  carouselIndex,
  onCarouselIndexChange,
  pauseCarousel = false,
}: ProductCardProps) {
  const { isAuthenticated } = useAuth();

  const showPrice = showPriceProp ?? isAuthenticated;
  const formattedPrice = formatCurrency(price);

  const variantImages = variantes
    .filter((v) => v.imgUrl)
    .map((v) => v.imgUrl as string);

  const hasVariantImages = variantImages.length > 0;
  const imageSrc = imgUrl || PLACEHOLDER_IMAGE;

  return (
    <motion.div
      whileHover={sinStock ? {} : { y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "group flex h-full relative",
        sinStock && "pointer-events-none",
        className,
      )}
      onClick={onClick}
    >
      <Card
        className={cn(
          "relative flex h-full w-full flex-col overflow-hidden p-0 transition-all duration-300 hover:shadow-[0_12px_48px_rgba(29,53,87,0.12)]",
          sinStock && "opacity-60",
          onClick && "cursor-pointer",
        )}
      >
        <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-gradient-to-br from-cerulean-400 to-cerulean-600">
          {hasVariantImages ? (
            <ProductImageCarousel
              key={`${id}-${variantImages.join("-")}`}
              images={variantImages}
              alt={name}
              sinStock={sinStock}
              interval={4000}
              currentIndex={carouselIndex}
              onIndexChange={onCarouselIndexChange}
              pauseAutoRotate={pauseCarousel}
            />
          ) : (
            <Image
              src={imageSrc}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={cn(
                "object-cover transition-transform duration-500 group-hover:scale-105",
                sinStock && "grayscale",
              )}
            />
          )}
          {sinStock && (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-[#b7102a] px-3 py-1 text-xs font-bold text-white shadow-lg">
              Sin Stock
            </span>
          )}
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
                  disabled={sinStock}
                >
                  <ShoppingCart01Icon className="size-5" />
                </Button>
              </div>
            ) : (
              <Link
                href="/login"
                className={cn(sinStock && "pointer-events-none")}
              >
                <Button
                  size="lg"
                  className="w-full bg-cerulean-500 text-base font-bold text-white hover:bg-cerulean-400 shadow-sm"
                  disabled={sinStock}
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
