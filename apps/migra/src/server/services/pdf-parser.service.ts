import pdfParse from "pdf-parse-fork";
import { ParsedProduct } from "@/types/producto.types";

export const pdfParserService = {
  async parseProductCatalog(buffer: Buffer): Promise<ParsedProduct[]> {
    const data = await pdfParse(buffer);
    const text = data.text;

    const products: ParsedProduct[] = [];
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Buscar líneas que empiecen con números (SKU)
      const skuMatch = line.match(/^(\d+)(\/\d+ml)?/);

      if (skuMatch) {
        const fullSku = skuMatch[0];
        const baseSku = skuMatch[1];
        const presentacion = skuMatch[2]?.replace("/", "");

        // El nombre del producto está después del SKU en la misma línea o siguiente
        let name = line.replace(fullSku, "").trim();

        if (!name && i + 1 < lines.length) {
          name = lines[i + 1];
        }

        if (name) {
          products.push({
            sku: presentacion ? fullSku : baseSku,
            name,
            presentacion,
          });
        }
      }
    }

    return products;
  },
};
