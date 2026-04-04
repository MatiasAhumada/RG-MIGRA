export const TYPOGRAPHY = {
  DISPLAY_LG: "text-display-lg",
  HEADLINE_MD: "text-headline-md",
  HEADLINE_SM: "text-xl font-display tracking-tight",
  BODY_MD: "text-sm leading-relaxed",
  BODY_LG: "text-base leading-relaxed",
  LABEL_SM: "text-label-sm",
} as const;

export const SPACING = {
  PAGE_X: "px-6 md:px-12 lg:px-20",
  PAGE_Y: "py-8 md:py-12 lg:py-16",
  SECTION_GAP: "space-y-12 md:space-y-16",
  CARD_GAP: "gap-6",
  LIST_ITEM_GAP: "space-y-3",
} as const;

export const SHADOWS = {
  AMBIENT: "shadow-ambient",
  CARD: "shadow-[0_8px_40px_rgba(29,53,87,0.06)]",
  MODAL: "shadow-[0_8px_40px_rgba(29,53,87,0.12)]",
  FLOATING: "shadow-[0_4px_24px_rgba(29,53,87,0.08)]",
} as const;

export const RADIUS = {
  CARD: "rounded-[2rem]",
  INPUT: "rounded-2xl",
  BUTTON: "rounded-2xl",
  MODAL: "rounded-[2rem]",
  CHIP: "rounded-full",
} as const;

export const ANIMATION = {
  FADE_IN: "animate-in fade-in",
  SLIDE_UP: "animate-in slide-in-from-bottom-4",
  SLIDE_DOWN: "animate-in slide-in-from-top-4",
  SLIDE_LEFT: "animate-in slide-in-from-left-4",
  SLIDE_RIGHT: "animate-in slide-in-from-right-4",
  ZOOM_IN: "animate-in zoom-in-95",
  DURATION_200: "duration-200",
  DURATION_300: "duration-300",
  DURATION_500: "duration-500",
} as const;
