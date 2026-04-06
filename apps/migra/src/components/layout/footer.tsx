import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { SmartPhone01Icon, Location01Icon } from "hugeicons-react";

export function Footer() {
  return (
    <footer className="bg-surface-container-low">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-20 lg:px-32">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <span className="flex h-9 items-center rounded-xl gradient-primary px-3 shadow-ambient text-sm font-bold text-white whitespace-nowrap">
              MIGRA
            </span>
            <div className="flex flex-col gap-2 text-sm text-on-surface-variant">
              <span className="flex items-center gap-2">
                <SmartPhone01Icon className="size-4" />
                +54 11 1234-5678
              </span>
              <span className="flex items-center gap-2">
                <Location01Icon className="size-4" />
                Av. Corrientes 1234, CABA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm text-on-surface-variant">
            <Link
              href={ROUTES.HOME}
              className="hover:text-on-surface transition-colors"
            >
              Inicio
            </Link>
            <Link
              href={ROUTES.CATALOG}
              className="hover:text-on-surface transition-colors"
            >
              Catálogo
            </Link>
            <Link
              href={ROUTES.LOGIN}
              className="hover:text-on-surface transition-colors"
            >
              Ingresar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
