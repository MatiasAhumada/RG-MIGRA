"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CheckmarkCircle01Icon,
  InformationCircleIcon,
  Alert02Icon,
  Cancel01Icon,
} from "hugeicons-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CheckmarkCircle01Icon className="size-5 text-white" />,
        info: <InformationCircleIcon className="size-5 text-white" />,
        warning: <Alert02Icon className="size-5 text-white" />,
        error: <Cancel01Icon className="size-5 text-white" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--success-bg": "#5a9a4e",
          "--success-text": "#ffffff",
          "--success-border": "#5a9a4e",
          "--error-bg": "#b7102a",
          "--error-text": "#ffffff",
          "--error-border": "#b7102a",
          "--warning-bg": "#e6a700",
          "--warning-text": "#ffffff",
          "--warning-border": "#e6a700",
          "--info-bg": "#2b6485",
          "--info-text": "#ffffff",
          "--info-border": "#2b6485",
        } as React.CSSProperties & Record<string, string>
      }
      toastOptions={{
        classNames: {
          toast:
            "group/toast border rounded-2xl p-4 shadow-lg font-medium [&>[data-icon]]:shrink-0",
          success: "!bg-[#5a9a4e] !text-white !border-[#5a9a4e]",
          error: "!bg-[#b7102a] !text-white !border-[#b7102a]",
          warning: "!bg-[#e6a700] !text-white !border-[#e6a700]",
          info: "!bg-[#2b6485] !text-white !border-[#2b6485]",
          content: "whitespace-pre-line text-sm",
          description: "whitespace-pre-line text-xs opacity-90 mt-1",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
