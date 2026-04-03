import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function Footer() {
  return (
    <footer className="border-t border-outline-variant/10 bg-surface-container">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-xl gradient-primary">
              <span className="text-sm font-bold text-white">M</span>
            </div>
            <span className="text-sm font-semibold text-on-surface">
              MIGRA Distribuciones S.R.L
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-on-surface-variant">
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

          <p className="text-xs text-on-surface-variant">
            C.U.I.T: 33-70903990-9
          </p>
        </div>
      </div>
    </footer>
  );
}
