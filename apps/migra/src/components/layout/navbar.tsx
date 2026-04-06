"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { useSearch } from "@/context/search-context";
import {
  Login01Icon,
  UserCircleIcon,
  ShoppingCart01Icon,
  Search01Icon,
} from "hugeicons-react";

export function Navbar() {
  const pathname = usePathname();
  const { query, setQuery } = useSearch();
  const isAuthenticated =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8 lg:px-16">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative hidden sm:block">
            <Search01Icon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground/60" />
            <Input
              placeholder="Buscar producto..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 w-56 rounded-full bg-muted/50 pl-9 pr-4 text-sm ring-0 focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <Link href={ROUTES.HOME} className="flex items-center">
          <span
            className="text-5xl font-black italic tracking-tighter"
            style={{
              fontFamily: "Calibri, Candara, Segoe, sans-serif",
              color: "#c0392b",
            }}
          >
            MIGRA
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-2">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="icon-sm">
                    <UserCircleIcon className="size-6" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/dashboard/pedido">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="icon-sm">
                    <ShoppingCart01Icon className="size-6" />
                  </Button>
                </motion.div>
              </Link>
            </>
          ) : (
            <Link href={ROUTES.LOGIN} className="shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button variant="ghost" size="sm" className="gap-2">
                  <Login01Icon className="size-4" />
                  Iniciar Sesión
                </Button>
              </motion.div>
            </Link>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
