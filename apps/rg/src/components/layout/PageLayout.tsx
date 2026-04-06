import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { PublicLayout } from "./PublicLayout";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
  variant: "admin" | "client";
}

export function AppLayout({ children, variant }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar variant={variant} />
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

interface PublicLayoutWrapperProps {
  children: ReactNode;
}

export function PublicLayoutWrapper({ children }: PublicLayoutWrapperProps) {
  return <PublicLayout>{children}</PublicLayout>;
}

export { Header } from "./Header";
export { Sidebar } from "./Sidebar";
