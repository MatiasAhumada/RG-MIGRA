"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import {
  Home01Icon,
  Package01Icon,
  Group01Icon,
  ShoppingCart01Icon,
  Logout01Icon,
  Menu01Icon,
  Cancel01Icon,
  BarChartIcon,
  GridIcon,
  UserCircleIcon,
} from "hugeicons-react";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const adminNavItems: NavItem[] = [
  { href: "/admin", label: "Panel", icon: Home01Icon },
  { href: "/admin/productos", label: "Productos", icon: Package01Icon },
  { href: "/admin/clientes", label: "Clientes", icon: Group01Icon },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart01Icon },
];

const clientNavItems: NavItem[] = [
  { href: "/", label: "Inicio", icon: Home01Icon },
  { href: "/catalogo", label: "Catálogo", icon: GridIcon },
  { href: "/dashboard", label: "Mi Panel", icon: BarChartIcon },
  {
    href: "/dashboard/ordenes",
    label: "Mis Pedidos",
    icon: ShoppingCart01Icon,
  },
];

interface AppSidebarProps {
  variant?: "admin" | "client";
}

export function AppSidebar({ variant = "admin" }: AppSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = variant === "admin" ? adminNavItems : clientNavItems;

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-5 left-5 z-50 flex size-11 items-center justify-center rounded-2xl bg-white shadow-[0_4px_24px_rgba(29,53,87,0.08)] md:hidden"
      >
        <Menu01Icon className="size-5 text-cerulean-500" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-oxford-navy/20 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-oxford-navy-500 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-center px-5 py-6">
            <Link href="/" className="flex items-center justify-center w-full">
              <span
                className="text-4xl font-bold italic tracking-tight"
                style={{
                  fontFamily: "Calibri, Candara, Segoe, 'Segoe UI', sans-serif",
                  color: "#c0392b",
                }}
              >
                MIGRA
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-4 flex size-9 items-center justify-center rounded-xl text-white/80 hover:bg-white/10 md:hidden"
            >
              <Cancel01Icon className="size-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-3 py-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start gap-3 text-white/80 hover:bg-white/10 hover:text-white",
                        isActive && "bg-white/15 font-semibold text-white",
                      )}
                    >
                      <Icon className="size-5" />
                      {item.label}
                    </Button>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-white/10">
                  <UserCircleIcon className="size-6 text-white/70" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-white">
                    {user?.name || "Usuario"}
                  </span>
                  <span className="text-sm text-white/50">
                    {variant === "admin" ? "Administrador" : "Cliente"}
                  </span>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={logout}
                  className="text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <Logout01Icon className="size-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
