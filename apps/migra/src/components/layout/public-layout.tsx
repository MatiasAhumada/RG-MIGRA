import { cn } from "@/lib/utils";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface PublicLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PublicLayout({ children, className }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      <main className={cn("flex-1 pt-20", className)}>{children}</main>
      <Footer />
    </div>
  );
}
