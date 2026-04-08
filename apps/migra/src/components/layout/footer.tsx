import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { SmartPhone01Icon, Location01Icon } from "hugeicons-react";

export function Footer() {
  return (
    <footer className="bg-surface-container-low">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-12 lg:px-16">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
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
            <div className="flex flex-col gap-2 text-base text-on-surface-variant">
              <span className="flex items-center gap-2">
                <SmartPhone01Icon className="size-5" />
                +54 11 1234-5678
              </span>
              <span className="flex items-center gap-2">
                <Location01Icon className="size-5" />
                Av. Corrientes 1234, CABA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8 text-base text-on-surface-variant">
            <Link
              href={ROUTES.HOME}
              className="font-medium hover:text-on-surface transition-colors"
            >
              Inicio
            </Link>
            <Link
              href={ROUTES.CATALOG}
              className="font-medium hover:text-on-surface transition-colors"
            >
              Catálogo
            </Link>
            <Link
              href={ROUTES.LOGIN}
              className="font-medium hover:text-on-surface transition-colors"
            >
              Ingresar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
