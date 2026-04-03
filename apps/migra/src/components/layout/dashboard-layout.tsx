import { cn } from "@/lib/utils";
import { DashboardSidebar } from "./dashboard-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  variant?: "admin" | "client";
}

export function DashboardLayout({
  children,
  className,
  variant = "admin",
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      <DashboardSidebar variant={variant} />
      <main className={cn("min-h-screen flex-1 md:ml-72", className)}>
        <div className="w-full px-6 py-8 md:px-12 lg:px-16">{children}</div>
      </main>
    </div>
  );
}
