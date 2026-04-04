import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "frosted-input h-11 w-full min-w-0 rounded-2xl px-4 py-2 text-sm text-on-surface transition-all duration-300 outline-none placeholder:text-on-surface-variant/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus:ghost-border-focus md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
