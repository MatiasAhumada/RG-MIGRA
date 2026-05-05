import type { CartItem } from "@/types/cart.types";

export const cartUtils = {
  calculateSubtotal(price: number, cantidad: number): number {
    return price * cantidad;
  },

  calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.subtotal, 0);
  },

  calculateItemCount(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.cantidad, 0);
  },

  findExistingItemIndex(
    items: CartItem[],
    productoId: number,
    color?: string,
    talle?: number,
  ): number {
    return items.findIndex(
      (item) =>
        item.productoId === productoId &&
        item.color === color &&
        item.talle === talle,
    );
  },

  createCartItem(item: Omit<CartItem, "subtotal">): CartItem {
    return {
      ...item,
      subtotal: this.calculateSubtotal(item.price, item.cantidad),
    };
  },

  updateItemQuantity(item: CartItem, newQuantity: number): CartItem {
    return {
      ...item,
      cantidad: newQuantity,
      subtotal: this.calculateSubtotal(item.price, newQuantity),
    };
  },

  incrementItemQuantity(item: CartItem, increment: number): CartItem {
    const newQuantity = item.cantidad + increment;
    return this.updateItemQuantity(item, newQuantity);
  },

  generateItemKey(item: CartItem, index: number): string {
    return `${item.productoId}-${item.color || "no-color"}-${item.talle || "no-talle"}-${index}`;
  },
};
