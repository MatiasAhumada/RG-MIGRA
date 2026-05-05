"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GenericModal } from "@/components/common/GenericModal";
import { ColorButton } from "@/components/common/ColorButton";
import { TalleButton } from "@/components/common/TalleButton";
import { Button } from "@/components/ui/button";
import { ProductImageCarousel } from "@/components/common/ProductImageCarousel";
import {
  ShoppingCart01Icon,
  Add01Icon,
  Remove01Icon,
  Login02Icon,
} from "hugeicons-react";
import { formatCurrency } from "@/utils/formatters";
import { useAuth } from "@/context/auth-context";
import { ROUTES } from "@/constants/routes";
import type { ProductoWithRelations } from "@/types/producto.types";
import type { ColorProducto } from "@/types/producto-variante.types";

interface ProductDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  producto: ProductoWithRelations;
  carouselIndex?: number;
  onCarouselIndexChange?: (index: number) => void;
}

const PLACEHOLDER_IMAGE = "/assets/images/placeholder-product.png";

export function ProductDetailModal({
  open,
  onOpenChange,
  producto,
  carouselIndex: externalCarouselIndex,
  onCarouselIndexChange,
}: ProductDetailModalProps) {
  const { isAuthenticated } = useAuth();
  const [selectedColor, setSelectedColor] = useState<ColorProducto | null>(
    null,
  );
  const [selectedTalle, setSelectedTalle] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const carouselIndex = externalCarouselIndex ?? 0;

  const variantImages = producto.variantes
    .filter((v) => v.imgUrl)
    .map((v) => v.imgUrl as string);

  const hasVariantImages = variantImages.length > 0;
  const imageSrc = producto.imgUrl || PLACEHOLDER_IMAGE;

  const availableColors = Array.from(
    new Set(
      producto.variantes
        .filter((v) => v.color)
        .map((v) => v.color as ColorProducto),
    ),
  );

  const availableTalles = Array.from(
    new Set(
      producto.variantes
        .filter((v) => v.talle && (!selectedColor || v.color === selectedColor))
        .map((v) => v.talle as number),
    ),
  ).sort((a, b) => a - b);

  const handleAddToCart = () => {
    console.log({
      productoId: producto.id,
      color: selectedColor,
      talle: selectedTalle,
      quantity,
    });
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const breadcrumb = `${producto.categoria.name}${producto.subcategoria ? ` / ${producto.subcategoria.name}` : ""}`;

  return (
    <GenericModal
      open={open}
      onOpenChange={onOpenChange}
      title={producto.name}
      description={breadcrumb}
      size="4xl"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
          {hasVariantImages ? (
            <ProductImageCarousel
              images={variantImages}
              alt={producto.name}
              sinStock={producto.sinStock}
              interval={4000}
              currentIndex={carouselIndex}
              onIndexChange={onCarouselIndexChange}
            />
          ) : (
            <Image
              src={imageSrc}
              alt={producto.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          )}
          {producto.sinStock && (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-[#b7102a] px-3 py-1 text-xs font-bold text-white shadow-lg">
              Sin Stock
            </span>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            {isAuthenticated ? (
              <p className="text-3xl font-bold text-primary">
                {formatCurrency(producto.price)}
              </p>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <Login02Icon className="size-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-on-surface">
                      Inicia sesión para ver precios
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Accede a precios exclusivos y realiza pedidos
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href={ROUTES.LOGIN} className="flex-1">
                    <Button
                      size="lg"
                      className="w-full gradient-primary text-white shadow-ambient"
                    >
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link href={ROUTES.REGISTER} className="flex-1">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary/5"
                    >
                      Registrarse
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-on-surface-variant">
              SKU: {producto.sku}
            </span>
            <span className="text-sm font-medium text-on-surface-variant">
              Marca: {producto.marca.name}
            </span>
          </div>

          {availableColors.length > 0 && (
            <div>
              <label className="mb-3 block text-sm font-semibold text-on-surface">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <ColorButton
                    key={color}
                    color={color}
                    selected={selectedColor === color}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedTalle(null);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {availableTalles.length > 0 && (
            <div>
              <label className="mb-3 block text-sm font-semibold text-on-surface">
                Tamaño
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTalles.map((talle) => (
                  <TalleButton
                    key={talle}
                    talle={talle}
                    selected={selectedTalle === talle}
                    onClick={() => setSelectedTalle(talle)}
                  />
                ))}
              </div>
            </div>
          )}

          {isAuthenticated && (
            <>
              <div>
                <label className="mb-3 block text-sm font-semibold text-on-surface">
                  Cantidad
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Remove01Icon className="size-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-semibold">
                    {quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={incrementQuantity}
                  >
                    <Add01Icon className="size-4" />
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full gradient-primary text-white shadow-ambient"
                onClick={handleAddToCart}
                disabled={producto.sinStock}
              >
                <ShoppingCart01Icon className="mr-2 size-5" />
                Añadir al Carrito
              </Button>
            </>
          )}
        </div>
      </div>
    </GenericModal>
  );
}
