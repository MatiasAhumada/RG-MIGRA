import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search01Icon } from "hugeicons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  title: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  loading?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: ReactNode;
  totalLabel?: string;
  onRowClick?: (item: T) => void;
  expandedContent?: (item: T) => ReactNode;
}

export function DataTable<T>({
  title,
  subtitle,
  columns,
  data,
  keyExtractor,
  emptyMessage = "No hay datos disponibles",
  loading = false,
  searchPlaceholder = "Buscar...",
  onSearch,
  actions,
  totalLabel,
  onRowClick,
  expandedContent,
}: DataTableProps<T>) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground [-0.02em]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">{actions}</div>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl bg-vanilla-cream-700">
        {onSearch && (
          <div className="bg-card p-5">
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search01Icon
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50"
              />
              <Input
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 bg-vanilla-cream-700 text-foreground placeholder:text-muted-foreground/50 focus:ring-primary text-sm"
              />
            </div>
          </div>
        )}

        <div className="p-5 bg-vanilla-cream-700">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`pb-4 font-semibold ${column.className || ""}`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-12 text-center text-muted-foreground font-medium"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        Cargando...
                      </div>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-12 text-center text-muted-foreground font-medium"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <AnimatePresence key={keyExtractor(item)}>
                      <motion.tr
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.25,
                          delay: shouldReduceMotion ? 0 : index * 0.04,
                        }}
                        onClick={() => onRowClick?.(item)}
                        className={`border-b border-border last:border-b-0 hover:bg-muted transition-colors ${
                          onRowClick ? "cursor-pointer" : ""
                        }`}
                      >
                        {columns.map((column) => (
                          <td
                            key={column.key}
                            className="py-4 text-sm font-medium text-foreground"
                          >
                            {column.render
                              ? column.render(item)
                              : ((item as Record<string, unknown>)[
                                  column.key
                                ] as React.ReactNode)}
                          </td>
                        ))}
                      </motion.tr>
                      {expandedContent?.(item)}
                    </AnimatePresence>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalLabel && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {totalLabel}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
