export const FLOATING_BUTTONS = {
  POSITION_RIGHT: "1.5rem",
  POSITION_BOTTOM_BASE: "1.5rem",
  BUTTON_SIZE: "3.5rem",
  BUTTON_GAP: "1rem",
} as const;

export const FLOATING_BUTTONS_Z_INDEX = {
  WHATSAPP: 30,
  CART: 30,
} as const;

export const calculateCartButtonBottom = () => {
  const baseBottom = parseFloat(FLOATING_BUTTONS.POSITION_BOTTOM_BASE);
  const buttonSize = parseFloat(FLOATING_BUTTONS.BUTTON_SIZE);
  const gap = parseFloat(FLOATING_BUTTONS.BUTTON_GAP);
  return `${baseBottom + buttonSize + gap}rem`;
};
