import { cn } from "@/lib/utils";

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  PENDING: {
    label: "Pendiente",
    color: "text-cerulean-400",
    bg: "bg-cerulean-900/30",
  },
  CONFIRMED: {
    label: "Confirmado",
    color: "text-honeydew-200",
    bg: "bg-honeydew-800/50",
  },
  PREPARING: {
    label: "Preparando",
    color: "text-frosted-blue-200",
    bg: "bg-frosted-blue-900/30",
  },
  SHIPPED: {
    label: "Enviado",
    color: "text-cerulean-600",
    bg: "bg-cerulean-900/30",
  },
  DELIVERED: {
    label: "Entregado",
    color: "text-honeydew-300",
    bg: "bg-honeydew-800/50",
  },
  CANCELLED: {
    label: "Cancelado",
    color: "text-punch-red-400",
    bg: "bg-punch-red-900/30",
  },
  APPROVED: {
    label: "Aprobado",
    color: "text-honeydew-200",
    bg: "bg-honeydew-800/50",
  },
  REJECTED: {
    label: "Rechazado",
    color: "text-punch-red-400",
    bg: "bg-punch-red-900/30",
  },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  if (!config) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-label-sm font-medium",
        config.bg,
        config.color,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
