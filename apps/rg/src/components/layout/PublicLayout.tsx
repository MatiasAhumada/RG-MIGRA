import { ReactNode } from "react";
import { Header } from "./Header";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <footer className="border-t border-border bg-vanilla-cream-700 px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-hunter-green to-hunter-green-400">
              <span className="text-xs font-bold text-white">RG</span>
            </div>
            <span className="text-sm text-muted-foreground">
              &copy; 2026 Robles Gonzalo. Todos los derechos reservados.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/terminos"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              T&eacute;rminos
            </a>
            <a
              href="/privacidad"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacidad
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
