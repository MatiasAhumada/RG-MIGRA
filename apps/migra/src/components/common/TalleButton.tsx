interface TalleButtonProps {
  talle: number;
  selected: boolean;
  onClick: () => void;
}

export function TalleButton({ talle, selected, onClick }: TalleButtonProps) {
  const baseClasses =
    "flex h-10 min-w-[3rem] items-center justify-center rounded-md border-2 px-4 text-sm font-semibold transition-all";
  const selectedClasses = selected
    ? "border-primary bg-primary text-white"
    : "border-gray-300 bg-white text-on-surface hover:border-primary";

  return (
    <button onClick={onClick} className={`${baseClasses} ${selectedClasses}`}>
      {talle}
    </button>
  );
}
