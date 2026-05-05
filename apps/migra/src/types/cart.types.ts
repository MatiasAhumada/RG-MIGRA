import { ColorProducto } from "@/types/producto-variante.types";

export interface CartItem {
  productoId: number;
  productoName: string;
  productoSku: string;
  price: number;
  imgUrl?: string;
  color?: ColorProducto;
  talle?: number;
  varianteSku?: string;
  cantidad: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}
