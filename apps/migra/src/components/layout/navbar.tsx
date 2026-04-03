"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import {
  Home01Icon,
  Login01Icon,
  UserAdd01Icon,
  GridIcon,
} from "hugeicons-react";

const navLinks = [
  { href: ROUTES.HOME, label: "Inicio", icon: Home01Icon },
  { href: ROUTES.CATALOG, label: "Catálogo", icon: GridIcon },
];

const authLinks = [
  { href: ROUTES.LOGIN, label: "Ingresar", icon: Login01Icon },
  { href: ROUTES.REGISTER, label: "Registrarse", icon: UserAdd01Icon },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-outline-variant/10"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <Link href={ROUTES.HOME} className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <div className="flex size-10 items-center justify-center rounded-2xl gradient-primary">
              <span className="text-xl font-bold text-white">M</span>
            </div>
            <span className="text-headline-md text-on-surface">MIGRA</span>
          </motion.div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="size-4" />
                    {link.label}
                  </Button>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {authLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    variant={
                      link.href === ROUTES.REGISTER ? "default" : "outline"
                    }
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="size-4" />
                    <span className="hidden sm:inline">{link.label}</span>
                  </Button>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </motion.header>
  );
}
