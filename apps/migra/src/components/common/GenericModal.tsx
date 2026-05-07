"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cancel01Icon } from "hugeicons-react";
import { useReducedMotion } from "framer-motion";

interface GenericModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
}

const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
};

export function GenericModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
}: GenericModalProps) {
  const shouldReduceMotion = useReducedMotion();

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            variants={shouldReduceMotion ? undefined : backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-[#161d16]/60 backdrop-blur-sm"
          />
          <motion.div
            variants={shouldReduceMotion ? undefined : modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className={`rounded-[2rem] bg-white shadow-[0_16px_64px_rgba(29,53,87,0.12)] ${SIZE_CLASSES[size]} w-full max-h-[90vh] pointer-events-auto`}
              style={{ overflow: "visible" }}
            >
              <div className="flex items-center justify-between border-b border-[#161d16]/5 p-6">
                <div>
                  <h2
                    className="text-lg font-bold text-[#161d16]"
                    style={{
                      fontFamily:
                        "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                    }}
                  >
                    {title}
                  </h2>
                  {description && (
                    <p className="mt-1 text-sm text-[#3d4a3d]">{description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="text-[#3d4a3d] hover:bg-[#f3fcf0]/60 hover:text-[#161d16]"
                >
                  <Cancel01Icon className="size-5" />
                </Button>
              </div>
              <div
                className="p-6 overflow-y-auto"
                style={{ maxHeight: "calc(90vh - 120px)" }}
              >
                {children}
              </div>
              {footer && (
                <div className="flex justify-end gap-3 border-t border-[#161d16]/5 p-6">
                  {footer}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  loading?: boolean;
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  loading = false,
}: ConfirmModalProps) {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <GenericModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant={variant} onClick={handleConfirm} disabled={loading}>
            {loading ? "Procesando..." : confirmText}
          </Button>
        </>
      }
    >
      <p className="text-sm text-[#3d4a3d]">{description}</p>
    </GenericModal>
  );
}
