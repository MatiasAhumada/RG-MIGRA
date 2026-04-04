import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex flex-col gap-2 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-headline-md text-on-surface">{title}</h1>
        {description && (
          <p className="text-sm text-on-surface-variant">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </motion.div>
  );
}
