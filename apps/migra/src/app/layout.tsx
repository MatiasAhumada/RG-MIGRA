import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MIGRA Distribuciones",
  description:
    "Catálogo digital y automatización de pedidos - MIGRA Distribuciones S.R.L",
};

import { SearchProvider } from "@/context/search-context";
import { AuthProvider } from "@/context/auth-context";
import { CartProvider } from "@/context/cart-context";
import { CartSidebar } from "@/components/common/CartSidebar";
import { FloatingCartButton } from "@/components/common/FloatingCartButton";
import { ChangePasswordModal } from "@/components/common";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-full font-sans antialiased",
          plusJakarta.variable,
          manrope.variable,
          geistMono.variable,
        )}
      >
        <AuthProvider>
          <CartProvider>
            <SearchProvider>
              {children}
              <FloatingCartButton />
              <CartSidebar />
              <ChangePasswordModal />
              <Toaster />
            </SearchProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
