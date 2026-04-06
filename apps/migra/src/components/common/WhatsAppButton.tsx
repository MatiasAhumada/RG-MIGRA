"use client";

import { motion } from "framer-motion";
import { Message01Icon } from "hugeicons-react";

export function WhatsAppButton() {
  const phoneNumber = "5491112345678";
  const message = encodeURIComponent(
    "Hola! Me interesa conocer sus productos mayoristas.",
  );

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-shadow hover:shadow-xl hover:shadow-green-500/40"
    >
      <Message01Icon className="size-7" />
    </motion.a>
  );
}
