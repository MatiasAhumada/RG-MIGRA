export const MARCA_COLORS: Record<
  string,
  { bg: string; text: string; fontWeight?: string }
> = {
  BABELITO: {
    bg: "bg-blue-100",
    text: "text-blue-900",
  },
  SPA: {
    bg: "bg-green-100",
    text: "text-green-900",
  },
  RANDOM: {
    bg: "bg-orange-100",
    text: "text-orange-900",
  },
  JACTANS: {
    bg: "bg-white",
    text: "text-black",
    fontWeight: "font-bold",
  },
};

export const getMarcaColor = (marcaName: string) => {
  const normalized = marcaName.toUpperCase();
  return (
    MARCA_COLORS[normalized] || { bg: "bg-gray-50", text: "text-gray-900" }
  );
};
