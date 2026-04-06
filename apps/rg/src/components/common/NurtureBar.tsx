interface NurtureBarStep {
  key: string;
  label: string;
  completed: boolean;
  current?: boolean;
}

interface NurtureBarProps {
  steps: NurtureBarStep[];
}

export function NurtureBar({ steps }: NurtureBarProps) {
  return (
    <div className="flex w-full items-start justify-between overflow-x-auto px-2 py-4">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.key}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div className="relative flex w-full items-center">
              {step.completed ? (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-hunter-green to-hunter-green-400 text-white shadow-sm">
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              ) : step.current ? (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary ring-4 ring-secondary/20">
                  <span className="text-xs font-bold text-hunter-green">
                    {index + 1}
                  </span>
                </div>
              ) : (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  <span className="text-xs font-medium text-muted-foreground/50">
                    {index + 1}
                  </span>
                </div>
              )}

              {!isLast && (
                <div
                  className={`ml-2 h-0.5 flex-1 rounded-full transition-all duration-500 ${
                    steps[index + 1]?.completed
                      ? "bg-gradient-to-r from-hunter-green to-hunter-green-400"
                      : "bg-muted"
                  }`}
                />
              )}
            </div>

            <span
              className={`whitespace-nowrap text-center text-xs font-medium transition-colors ${
                step.completed
                  ? "text-hunter-green"
                  : step.current
                    ? "text-foreground"
                    : "text-muted-foreground/50"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
