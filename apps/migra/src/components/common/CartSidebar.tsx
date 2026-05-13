"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cancel01Icon, ShoppingCart01Icon } from "hugeicons-react";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { clienteService } from "@/services";
import { formatCurrency } from "@/utils/formatters";
import { cartUtils } from "@/utils/cart.util";
import { CartItem } from "@/components/common/CartItem";
import { CartEmptyState } from "@/components/common/CartEmptyState";
import { CheckoutModal } from "@/components/common/CheckoutModal";
import {
  CART_MESSAGES,
  CART_CONFIG,
  CART_Z_INDEX,
} from "@/constants/cart.constant";

const PLACEHOLDER_IMAGE = "/assets/images/placeholder-product.png";

export function CartSidebar() {
  const {
    items,
    total,
    itemCount,
    removeItem,
    updateQuantity,
    isOpen,
    closeCart,
  } = useCart();
  const { user } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [clienteId, setClienteId] = useState<number | null>(null);

  useEffect(() => {
    const loadClienteId = async () => {
      if (user?.id) {
        try {
          const clientes = await clienteService.findAll();
          const cliente = clientes.find((c) => c.userId === user.id);
          if (cliente) {
            setClienteId(cliente.id);
          }
        } catch (error) {
          console.error("Error loading cliente:", error);
        }
      }
    };

    loadClienteId();
  }, [user]);

  const itemCountText = `${itemCount} ${itemCount === 1 ? CART_MESSAGES.PRODUCT_SINGULAR : CART_MESSAGES.PRODUCT_PLURAL}`;

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: CART_CONFIG.ANIMATION_DURATION }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              style={{ zIndex: CART_Z_INDEX.BACKDROP }}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: CART_CONFIG.SPRING_DAMPING,
                stiffness: CART_CONFIG.SPRING_STIFFNESS,
              }}
              className="fixed right-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl"
              style={{
                maxWidth: CART_CONFIG.SIDEBAR_MAX_WIDTH,
                zIndex: CART_Z_INDEX.SIDEBAR,
              }}
            >
              <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <ShoppingCart01Icon className="size-6 text-primary" />
                  <div>
                    <h2 className="text-xl font-bold text-on-surface">
                      {CART_MESSAGES.TITLE}
                    </h2>
                    <p className="text-sm text-on-surface-variant">
                      {itemCountText}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeCart}
                  className="text-on-surface-variant hover:bg-gray-100"
                >
                  <Cancel01Icon className="size-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <CartEmptyState />
                ) : (
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <CartItem
                        key={cartUtils.generateItemKey(item, index)}
                        item={item}
                        index={index}
                        onRemove={removeItem}
                        onUpdateQuantity={updateQuantity}
                        placeholderImage={PLACEHOLDER_IMAGE}
                      />
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-gray-200 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-on-surface">
                      {CART_MESSAGES.TOTAL_LABEL}
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(total)}
                    </span>
                  </div>
                  <Button
                    size="lg"
                    className="w-full gradient-primary text-white shadow-ambient"
                    onClick={handleCheckout}
                  >
                    {CART_MESSAGES.CHECKOUT_BUTTON}
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal
        open={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        clienteId={clienteId || 0}
      />
    </>
  );
}
