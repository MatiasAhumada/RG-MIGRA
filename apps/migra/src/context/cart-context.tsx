"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { CartItem } from "@/types/cart.types";
import { cartUtils } from "@/utils/cart.util";
import { CART_CONFIG } from "@/constants/cart.constant";

interface CartContextValue {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (item: Omit<CartItem, "subtotal">) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, cantidad: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, "subtotal">) => {
    const newItem = cartUtils.createCartItem(item);

    setItems((prev) => {
      const existingIndex = cartUtils.findExistingItemIndex(
        prev,
        item.productoId,
        item.color,
        item.talle,
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = cartUtils.incrementItemQuantity(
          updated[existingIndex],
          item.cantidad,
        );
        return updated;
      }

      return [...prev, newItem];
    });

    setIsOpen(true);
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index: number, cantidad: number) => {
    if (cantidad < CART_CONFIG.MIN_QUANTITY) return;

    setItems((prev) => {
      const updated = [...prev];
      updated[index] = cartUtils.updateItemQuantity(updated[index], cantidad);
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const total = useMemo(() => cartUtils.calculateTotal(items), [items]);

  const itemCount = useMemo(() => cartUtils.calculateItemCount(items), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        itemCount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
