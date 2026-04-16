"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { useSearch } from "@/context/search-context";
import { useAuth } from "@/context/auth-context";
import {
  Login01Icon,
  UserCircleIcon,
  ShoppingCart01Icon,
  Search01Icon,
  Logout01Icon,
  ArrowDown01Icon,
} from "hugeicons-react";

export function Navbar() {
  const pathname = usePathname();
  const { query, setQuery } = useSearch();
  const { isAuthenticated, isClient, isAdmin, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout();
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 md:px-8 lg:px-16">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative hidden sm:block">
            <Search01Icon className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground/60" />
            <Input
              placeholder="Buscar producto..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 w-64 rounded-full bg-muted/50 pl-10 pr-4 text-base ring-0 focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <Link href={ROUTES.HOME} className="flex items-center">
          <span
            className="text-6xl font-bold italic tracking-tight"
            style={{
              fontFamily: "Calibri, Candara, Segoe, 'Segoe UI', sans-serif",
              color: "#c0392b",
            }}
          >
            MIGRA
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-2">
          {isAuthenticated ? (
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="gap-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <UserCircleIcon className="size-6" />
                  <span className="text-sm font-medium hidden md:inline">
                    {user?.name}
                  </span>
                  <ArrowDown01Icon className="size-4" />
                </Button>
              </motion.div>

              <AnimatePresence>
                {isMenuOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-[#161d16]/10 bg-white shadow-xl"
                    >
                      <div className="px-4 py-3 border-b border-[#161d16]/5">
                        <p className="text-sm font-semibold text-[#161d16]">
                          {user?.name}
                        </p>
                        <p className="text-xs text-[#3d4a3d]">{user?.email}</p>
                      </div>

                      <div className="py-1">
                        {isClient && (
                          <Link href={ROUTES.DASHBOARD}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start gap-3 rounded-none text-sm"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <ShoppingCart01Icon className="size-4" />
                              Mi Panel
                            </Button>
                          </Link>
                        )}
                        {isAdmin && (
                          <Link href={ROUTES.ADMIN}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start gap-3 rounded-none text-sm"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <UserCircleIcon className="size-4" />
                              Panel de Administración
                            </Button>
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-[#161d16]/5 py-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start gap-3 rounded-none text-sm text-[#b7102a] hover:bg-[#b7102a]/5 hover:text-[#b7102a]"
                          onClick={handleLogout}
                        >
                          <Logout01Icon className="size-4" />
                          Cerrar Sesión
                        </Button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href={ROUTES.LOGIN} className="shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button variant="ghost" size="lg" className="gap-2 text-base">
                  <Login01Icon className="size-5" />
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
