import { ShoppingCart01Icon } from "hugeicons-react";
import { CART_MESSAGES } from "@/constants/cart.constant";

export function CartEmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <ShoppingCart01Icon className="size-16 text-gray-300" />
      <div>
        <p className="text-lg font-semibold text-on-surface">
          {CART_MESSAGES.EMPTY_TITLE}
        </p>
        <p className="text-sm text-on-surface-variant">
          {CART_MESSAGES.EMPTY_DESCRIPTION}
        </p>
      </div>
    </div>
  );
}
