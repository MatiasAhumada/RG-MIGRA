"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import {
  Login01Icon,
  UserAdd01Icon,
  UserCircleIcon,
  ShoppingCart01Icon,
} from "hugeicons-react";

export function Navbar() {
  const pathname = usePathname();
  const isAuthenticated =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-20 lg:px-32">
        <div className="flex w-32" />

        <Link href={ROUTES.HOME} className="flex items-center justify-center">
          <span
            className="text-3xl font-bold italic tracking-tight text-blushed-brick"
            style={{ fontFamily: "Calibri, Candara, Segoe, sans-serif" }}
          >
            MIGRA
          </span>
        </Link>

        <div className="flex w-32 items-center justify-end gap-3">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="icon-sm">
                    <UserCircleIcon className="size-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/dashboard/pedido">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="icon-sm">
                    <ShoppingCart01Icon className="size-5" />
                  </Button>
                </motion.div>
              </Link>
            </>
          ) : (
            <>
              <Link href={ROUTES.LOGIN}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    <Login01Icon className="size-4" />
                    <span className="hidden sm:inline">Iniciar Sesión</span>
                  </Button>
                </motion.div>
              </Link>
              <Link href={ROUTES.REGISTER}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button variant="default" size="sm" className="gap-2">
                    <UserAdd01Icon className="size-4" />
                    <span className="hidden sm:inline">Registrarse</span>
                  </Button>
                </motion.div>
              </Link>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
