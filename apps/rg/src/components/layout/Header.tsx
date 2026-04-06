import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu01Icon, UserCircleIcon, ShoppingBag01Icon } from "hugeicons-react";

interface HeaderProps {
  isAuthenticated?: boolean;
  userName?: string;
  cartCount?: number;
  onMenuToggle?: () => void;
}

export function Header({
  isAuthenticated,
  userName,
  cartCount = 0,
  onMenuToggle,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="flex h-16 items-center gap-4 bg-background/80 px-6 backdrop-blur-xl md:px-12">
        <Button
          variant="ghost"
          size="icon-sm"
          className="shrink-0 md:hidden"
          onClick={onMenuToggle}
        >
          <Menu01Icon className="size-5" />
        </Button>

        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-vanilla-cream-300 to-sage-green">
            <span className="text-sm font-bold text-white">RG</span>
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-bold leading-tight tracking-tight text-foreground [-0.02em]">
              Robles Gonzalo
            </span>
            <span className="text-xs leading-tight text-muted-foreground">
              Catálogo Mayorista
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/catalogo"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Catálogo
          </Link>
          <Link
            href="/nosotros"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Nosotros
          </Link>
          <Link
            href="/contacto"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Contacto
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {cartCount > 0 && (
            <Button variant="ghost" size="icon-sm" className="relative">
              <ShoppingBag01Icon className="size-5" />
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-accent-warm text-xs font-bold text-white">
                {cartCount}
              </span>
            </Button>
          )}

          {isAuthenticated ? (
            <Button variant="secondary" size="sm" rounded="full">
              <UserCircleIcon className="size-5" />
              <span className="hidden sm:inline">{userName}</span>
            </Button>
          ) : (
            <Button variant="primary" size="sm" rounded="full" asChild>
              <Link href="/login">
                <UserCircleIcon className="size-5" />
                <span className="hidden sm:inline">Iniciar Sesión</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
