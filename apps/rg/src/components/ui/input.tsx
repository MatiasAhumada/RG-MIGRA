import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-xl bg-vanilla-cream-700 px-4 py-3 text-sm leading-relaxed text-foreground transition-all duration-200 outline-none placeholder:text-muted-foreground/50 focus:bg-card focus:ring-1 focus:ring-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground md:text-base",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
