import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NurtureBarStep {
  key: string;
  label: string;
  completed: boolean;
  current?: boolean;
}

interface NurtureBarProps {
  steps: NurtureBarStep[];
  className?: string;
}

export function NurtureBar({ steps, className }: NurtureBarProps) {
  return (
    <div className={cn("flex w-full items-center gap-2", className)}>
      {steps.map((step, index) => (
        <div key={step.key} className="flex flex-1 items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="flex flex-col items-center gap-3 flex-1"
          >
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
                step.completed && "gradient-primary text-white shadow-ambient",
                step.current &&
                  "bg-secondary-fixed text-on-surface ring-2 ring-secondary shadow-ambient",
                !step.completed &&
                  !step.current &&
                  "bg-surface-container-high text-on-surface-variant/50",
              )}
            >
              {step.completed ? (
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                "text-label-sm text-center",
                step.completed && "text-on-surface",
                step.current && "text-secondary font-semibold",
                !step.completed &&
                  !step.current &&
                  "text-on-surface-variant/40",
              )}
            >
              {step.label}
            </span>
          </motion.div>

          {index < steps.length - 1 && (
            <div className="mx-3 h-1 flex-1 rounded-full bg-surface-container-high overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: steps[index + 1].completed ? "100%" : "0%",
                }}
                transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                className="h-full rounded-full gradient-primary"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
