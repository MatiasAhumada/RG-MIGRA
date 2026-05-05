import Image from "next/image";
import { Delete02Icon, Add01Icon, Remove01Icon } from "hugeicons-react";
import { formatCurrency } from "@/utils/formatters";
import { COLOR_NAMES } from "@/constants/producto.constant";
import { CART_MESSAGES, CART_CONFIG } from "@/constants/cart.constant";
import type { CartItem as CartItemType } from "@/types/cart.types";

interface CartItemProps {
  item: CartItemType;
  index: number;
  onRemove: (index: number) => void;
  onUpdateQuantity: (index: number, cantidad: number) => void;
  placeholderImage: string;
}

export function CartItem({
  item,
  index,
  onRemove,
  onUpdateQuantity,
  placeholderImage,
}: CartItemProps) {
  const handleDecrement = () => {
    if (item.cantidad > CART_CONFIG.MIN_QUANTITY) {
      onUpdateQuantity(index, item.cantidad - 1);
    }
  };

  const handleIncrement = () => {
    onUpdateQuantity(index, item.cantidad + 1);
  };

  return (
    <div className="flex gap-4 rounded-lg border border-gray-200 p-4">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={item.imgUrl || placeholderImage}
          alt={item.productoName}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-on-surface line-clamp-2">
              {item.productoName}
            </h3>
            <p className="text-xs text-on-surface-variant">
              {CART_MESSAGES.SKU_LABEL} {item.productoSku}
            </p>
            {item.varianteSku && (
              <p className="text-xs text-on-surface-variant">
                {CART_MESSAGES.VARIANT_LABEL} {item.varianteSku}
              </p>
            )}
            {item.color && (
              <p className="text-xs text-on-surface-variant">
                {CART_MESSAGES.COLOR_LABEL} {COLOR_NAMES[item.color]}
              </p>
            )}
            {item.talle && (
              <p className="text-xs text-on-surface-variant">
                {CART_MESSAGES.SIZE_LABEL} {item.talle}
              </p>
            )}
          </div>
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700"
          >
            <Delete02Icon className="size-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              disabled={item.cantidad <= CART_CONFIG.MIN_QUANTITY}
              className="flex size-6 items-center justify-center rounded border border-gray-300 text-on-surface hover:bg-gray-100 disabled:opacity-50"
            >
              <Remove01Icon className="size-3" />
            </button>
            <span className="w-8 text-center text-sm font-semibold">
              {item.cantidad}
            </span>
            <button
              onClick={handleIncrement}
              className="flex size-6 items-center justify-center rounded border border-gray-300 text-on-surface hover:bg-gray-100"
            >
              <Add01Icon className="size-3" />
            </button>
          </div>
          <p className="text-sm font-bold text-primary">
            {formatCurrency(item.subtotal)}
          </p>
        </div>
      </div>
    </div>
  );
}
