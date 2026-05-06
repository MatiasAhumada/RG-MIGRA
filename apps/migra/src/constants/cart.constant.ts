export const CART_MESSAGES = {
  EMPTY_TITLE: "Tu carrito está vacío",
  EMPTY_DESCRIPTION: "Agrega productos para comenzar tu pedido",
  TITLE: "Carrito de Compras",
  TOTAL_LABEL: "Total",
  CHECKOUT_BUTTON: "Finalizar Pedido",
  PRODUCT_SINGULAR: "producto",
  PRODUCT_PLURAL: "productos",
  SKU_LABEL: "SKU:",
  VARIANT_LABEL: "Variante:",
  COLOR_LABEL: "Color:",
  SIZE_LABEL: "Talle:",
} as const;

export const CART_CONFIG = {
  MIN_QUANTITY: 1,
  SIDEBAR_MAX_WIDTH: "28rem",
  ANIMATION_DURATION: 0.2,
  SPRING_DAMPING: 30,
  SPRING_STIFFNESS: 300,
} as const;

export const CART_Z_INDEX = {
  BACKDROP: 40,
  SIDEBAR: 50,
} as const;
