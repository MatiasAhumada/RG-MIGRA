import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search01Icon } from "hugeicons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

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
  getRowClassName?: (item: T) => string;
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
  getRowClassName,
}: DataTableProps<T>) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="lg:ml-0">
          <h1
            className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-[#161d16]"
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-[#3d4a3d] mt-1 text-sm sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">{actions}</div>
        )}
      </div>

      <div className="rounded-[2rem] bg-white shadow-[0_8px_40px_rgba(29,53,87,0.06)] overflow-hidden">
        {onSearch && (
          <div className="p-5 border-b border-[#161d16]/5">
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search01Icon
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3d4a3d]/50"
              />
              <Input
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>
        )}

        <div className="p-5 overflow-visible">
          <div className="w-full overflow-x-auto overflow-y-visible">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#161d16]/5 text-xs font-semibold uppercase tracking-wider text-[#3d4a3d]">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`pb-3 text-center ${column.className || ""}`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="border-b border-[#161d16]/5">
                      {columns.map((column) => (
                        <td key={column.key} className="py-4 text-center">
                          <div className="flex justify-center">
                            <Skeleton className="h-6 w-24" />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-8 text-center text-[#3d4a3d] font-medium"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <Fragment key={keyExtractor(item)}>
                      <motion.tr
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: shouldReduceMotion ? 0 : index * 0.03,
                        }}
                        onClick={() => onRowClick?.(item)}
                        className={`border-b border-[#161d16]/5 hover:bg-[#f3fcf0]/30 transition-colors ${
                          onRowClick ? "cursor-pointer" : ""
                        } ${getRowClassName?.(item) || ""}`}
                      >
                        {columns.map((column) => (
                          <td
                            key={column.key}
                            className={`py-4 text-sm font-medium text-[#161d16] text-center ${column.className || ""}`}
                          >
                            {column.render
                              ? column.render(item)
                              : String(
                                  (item as Record<string, unknown>)[
                                    column.key
                                  ] ?? "",
                                )}
                          </td>
                        ))}
                      </motion.tr>
                      {expandedContent?.(item)}
                    </Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalLabel && (
            <div className="mt-4 pt-4 border-t border-[#161d16]/5">
              <p className="text-xs font-medium uppercase tracking-wider text-[#3d4a3d]">
                {totalLabel}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Fragment({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
