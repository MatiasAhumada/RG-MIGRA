"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
}

function FilterChip({
  label,
  count,
  isActive = false,
  onClick,
}: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-blushed-brick text-vanilla-cream-900 shadow-lg shadow-blushed-brick/25"
          : "bg-muted-highest text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "flex size-5 items-center justify-center rounded-full text-xs font-bold",
            isActive
              ? "bg-vanilla-cream-500/30 text-white"
              : "bg-muted text-muted-foreground/60",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

interface FilterChipsGroupProps {
  label?: string;
  chips: {
    id: string;
    label: string;
    count?: number;
  }[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function FilterChipsGroup({
  label,
  chips,
  activeId,
  onChange,
  className,
}: FilterChipsGroupProps) {
  const [internalActive, setInternalActive] = useState<string | undefined>(
    activeId,
  );

  const handleChange = (id: string) => {
    setInternalActive(id);
    onChange?.(id);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {label && (
        <span className="text-sm font-semibold text-foreground">{label}</span>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {chips.map((chip) => (
          <FilterChip
            key={chip.id}
            label={chip.label}
            count={chip.count}
            isActive={(activeId ?? internalActive) === chip.id}
            onClick={() => handleChange(chip.id)}
          />
        ))}
      </div>
    </div>
  );
}

export { FilterChip };
