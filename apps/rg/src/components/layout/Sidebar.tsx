"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home01Icon,
  ShoppingBag03Icon,
  UserCircleIcon,
  Package01Icon,
  ShoppingCart01Icon,
  Chart01Icon,
  Logout01Icon,
  ArrowDown01Icon,
  GridIcon,
  BarChartIcon,
} from "hugeicons-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const ADMIN_NAV: NavSection[] = [
  {
    title: "General",
    items: [
      { label: "Inicio", href: "/admin", icon: Home01Icon },
      { label: "Productos", href: "/admin/productos", icon: Package01Icon },
      { label: "Clientes", href: "/admin/clientes", icon: UserCircleIcon },
      {
        label: "Pedidos",
        href: "/admin/pedidos",
        icon: ShoppingCart01Icon,
        badge: "Nuevo",
      },
    ],
  },
  {
    title: "Catálogo",
    items: [
      {
        label: "Catálogo Público",
        href: "/admin/catalogo",
        icon: ShoppingBag03Icon,
      },
    ],
  },
  {
    title: "Análisis",
    items: [{ label: "Métricas", href: "/admin/metricas", icon: Chart01Icon }],
  },
];

const CLIENT_NAV: NavItem[] = [
  { label: "Inicio", href: "/", icon: Home01Icon },
  { label: "Catálogo", href: "/catalogo", icon: GridIcon },
  { label: "Mi Panel", href: "/dashboard", icon: BarChartIcon },
  {
    label: "Mis Pedidos",
    href: "/dashboard/ordenes",
    icon: ShoppingCart01Icon,
  },
];

interface SidebarProps {
  variant?: "admin" | "client";
  isOpen?: boolean;
  onClose?: () => void;
  userName?: string;
  userRole?: string;
}

export function Sidebar({
  variant = "admin",
  isOpen = true,
  onClose,
  userName = "Admin",
  userRole = "Administrador",
}: SidebarProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(ADMIN_NAV.map((s) => [s.title, true])),
  );

  const toggleSection = (sectionTitle: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const isAdmin = variant === "admin";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-on-surface/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-72 flex-col bg-vanilla-cream-700 transition-transform duration-300 md:translate-x-0 md:static md:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center gap-3 px-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-vanilla-cream-300 to-sage-green">
            <span className="text-base font-bold text-white">RG</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight tracking-tight text-foreground [-0.02em]">
              Robles Gonzalo
            </span>
            <span className="text-xs leading-tight text-muted-foreground">
              {isAdmin ? "Panel de Administración" : "Panel de Cliente"}
            </span>
          </div>
        </div>

        <div className="shrink-0 border-t border-border" />

        <div className="flex shrink-0 items-center gap-3 px-6 py-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted-high">
            <UserCircleIcon className="size-6 text-muted-foreground" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold text-foreground">
              {userName}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {userRole}
            </span>
          </div>
        </div>

        {isAdmin ? (
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
            {ADMIN_NAV.map((section) => (
              <div key={section.title} className="flex flex-col">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 transition-colors hover:text-muted-foreground"
                >
                  {section.title}
                  <ArrowDown01Icon
                    className={cn(
                      "size-4 transition-transform duration-200",
                      openSections[section.title] && "rotate-180",
                    )}
                  />
                </button>

                {openSections[section.title] && (
                  <div className="flex flex-col gap-0.5">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                            isActive
                              ? "bg-primary text-white shadow-float"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          <item.icon className="shrink-0 size-5" />
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                isActive
                                  ? "bg-vanilla-cream-500/30 text-white"
                                  : "bg-vanilla-cream-300/20 text-vanilla-cream-300",
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>
        ) : (
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
            {CLIENT_NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-white shadow-float"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="shrink-0 size-5" />
                  <span className="flex-1 truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}

        <div className="shrink-0 border-t border-border p-3">
          {isAdmin && (
            <Link
              href="/"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <GridIcon className="size-5" />
              Ver Catálogo Público
            </Link>
          )}
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-error">
            <Logout01Icon className="size-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
}
