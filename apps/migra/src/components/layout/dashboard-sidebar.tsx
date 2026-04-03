"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home01Icon,
  Package01Icon,
  Group01Icon,
  ShoppingCart01Icon,
  Settings01Icon,
  Logout01Icon,
  Menu01Icon,
  Cancel01Icon,
  BarChartIcon,
  GridIcon,
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
  {
    href: "/admin/configuracion",
    label: "Configuración",
    icon: Settings01Icon,
  },
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

interface DashboardSidebarProps {
  variant?: "admin" | "client";
}

export function DashboardSidebar({ variant = "admin" }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = variant === "admin" ? adminNavItems : clientNavItems;

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-5 left-5 z-50 flex size-11 items-center justify-center rounded-2xl bg-surface-container-lowest shadow-[0_4px_24px_rgba(29,53,87,0.08)] md:hidden"
      >
        <Menu01Icon className="size-5 text-on-surface" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-on-surface/20 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-surface-container-lowest shadow-[0_8px_40px_rgba(29,53,87,0.06)] md:translate-x-0 md:shadow-none"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-6 py-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl gradient-primary">
                <span className="text-xl font-bold text-white">Migra</span>
              </div>
              <span className="text-headline-md text-on-surface">MIGRA</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="flex size-9 items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container md:hidden"
            >
              <Cancel01Icon className="size-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "w-full justify-start gap-3",
                        isActive && "gradient-primary text-on-primary",
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

          <div className="border-t border-outline-variant/10 p-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-3 text-destructive"
              >
                <Logout01Icon className="size-5" />
                Cerrar Sesión
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
