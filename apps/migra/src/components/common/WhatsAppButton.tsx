"use client";

import { motion } from "framer-motion";
import { Message01Icon } from "hugeicons-react";
import {
  FLOATING_BUTTONS,
  FLOATING_BUTTONS_Z_INDEX,
} from "@/constants/floating-buttons.constant";

const WHATSAPP_CONFIG = {
  PHONE_NUMBER: "5491112345678",
  DEFAULT_MESSAGE: "Hola! Me interesa conocer sus productos mayoristas.",
} as const;

export function WhatsAppButton() {
  const message = encodeURIComponent(WHATSAPP_CONFIG.DEFAULT_MESSAGE);

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_CONFIG.PHONE_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-shadow hover:shadow-xl hover:shadow-green-500/40"
      style={{
        bottom: FLOATING_BUTTONS.POSITION_BOTTOM_BASE,
        right: FLOATING_BUTTONS.POSITION_RIGHT,
        width: FLOATING_BUTTONS.BUTTON_SIZE,
        height: FLOATING_BUTTONS.BUTTON_SIZE,
        zIndex: FLOATING_BUTTONS_Z_INDEX.WHATSAPP,
      }}
    >
      <Message01Icon className="size-7" />
    </motion.a>
  );
}
