"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart01Icon } from "hugeicons-react";
import { useCart } from "@/context/cart-context";
import { CART_BUTTON } from "@/constants/cart-button.constant";
import {
  FLOATING_BUTTONS,
  FLOATING_BUTTONS_Z_INDEX,
  calculateCartButtonBottom,
} from "@/constants/floating-buttons.constant";

export function FloatingCartButton() {
  const { itemCount, openCart } = useCart();

  const shouldShow = itemCount >= CART_BUTTON.BADGE_MIN_VALUE;

  const displayCount =
    itemCount > CART_BUTTON.BADGE_MAX_DISPLAY
      ? CART_BUTTON.BADGE_OVERFLOW_TEXT
      : itemCount;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={openCart}
          className="fixed flex items-center justify-center rounded-full shadow-lg hover:shadow-xl"
          style={{
            bottom: calculateCartButtonBottom(),
            right: FLOATING_BUTTONS.POSITION_RIGHT,
            width: FLOATING_BUTTONS.BUTTON_SIZE,
            height: FLOATING_BUTTONS.BUTTON_SIZE,
            zIndex: FLOATING_BUTTONS_Z_INDEX.CART,
            backgroundColor: "#2b6485",
          }}
          aria-label={CART_BUTTON.ARIA_LABEL}
        >
          <ShoppingCart01Icon className="size-6 text-white" />

          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
            className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md"
          >
            {displayCount}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
