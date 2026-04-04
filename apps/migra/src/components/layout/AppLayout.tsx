import { cn } from "@/lib/utils";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
  variant?: "admin" | "client";
}

export function AppLayout({
  children,
  className,
  variant = "admin",
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      <AppSidebar variant={variant} />
      <main className={cn("min-h-screen flex-1 md:ml-72", className)}>
        <div className="w-full px-6 py-8 md:px-10 lg:px-14">{children}</div>
      </main>
    </div>
  );
}
