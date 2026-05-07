export const CHECKOUT_MESSAGES = {
  TITLE: "Finalizar Pedido",
  DELIVERY_METHOD_LABEL: "Método de entrega",
  DELIVERY_OPTION: "Envío a domicilio",
  PICKUP_OPTION: "Retiro en local",
  ADDRESS_LABEL: "Dirección de envío",
  SELECT_ADDRESS_PLACEHOLDER: "Seleccionar dirección",
  NO_ADDRESSES: "No tenés direcciones guardadas. Agregá una para continuar.",
  ADD_ADDRESS_BUTTON: "Agregar otra dirección",
  ADD_FIRST_ADDRESS_BUTTON: "Agregar dirección",
  PICKUP_ADDRESS_LABEL: "Dirección del local",
  OBSERVATIONS_LABEL: "Observaciones (opcional)",
  OBSERVATIONS_PLACEHOLDER: "Agregá cualquier comentario sobre tu pedido...",
  ORDER_SUMMARY_TITLE: "Resumen del pedido",
  TOTAL_LABEL: "Total",
  CANCEL_BUTTON: "Cancelar",
  CONFIRM_BUTTON: "Confirmar Pedido",
  CONFIRMING_BUTTON: "Confirmando...",
  SUCCESS_MESSAGE: "Pedido creado exitosamente",
  ERROR_MESSAGE: "Error al crear el pedido",
} as const;

export const DELIVERY_METHOD = {
  DELIVERY: "DELIVERY",
  PICKUP: "PICKUP",
} as const;

export const PICKUP_ADDRESS = {
  DIRECCION: "Av. Ejemplo 1234",
  LOCALIDAD: "Ciudad Ejemplo",
  PROVINCIA: "Provincia Ejemplo",
  COD_POSTAL: "0000",
} as const;

export type DeliveryMethod =
  (typeof DELIVERY_METHOD)[keyof typeof DELIVERY_METHOD];
