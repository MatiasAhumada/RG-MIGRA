import * as XLSX from "xlsx";
import { COLOR_LETTER_MAP } from "@/constants/producto.constant";
import { ColorProducto } from "@prisma/client";
import { ParsedProductExcel } from "@/types/producto.types";

export const excelParserService = {
  async parseProductCatalog(buffer: Buffer): Promise<ParsedProductExcel[]> {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    }) as string[][];

    const products: ParsedProductExcel[] = [];

    let currentMarca = "";
    let currentCategoria = "";
    let currentSubcategoria = "";

    for (let i = 0; i < jsonData.length; i++) {
      const row = jsonData[i];

      if (!row || row.length === 0) continue;

      const firstCell = String(row[0] || "").trim();

      if (!firstCell) continue;

      if (i === 0 && firstCell) {
        currentMarca = firstCell.toUpperCase();
        continue;
      }

      if (firstCell.startsWith("*")) {
        currentSubcategoria = firstCell.substring(1).trim().toUpperCase();
        continue;
      }

      if (firstCell === "CATEGORIA") {
        currentCategoria = String(row[1] || "")
          .trim()
          .toUpperCase();
        continue;
      }

      if (firstCell === "SUBCATEGORIA") {
        currentSubcategoria = String(row[1] || "")
          .trim()
          .toUpperCase();
        continue;
      }

      if (!currentCategoria || !currentSubcategoria) continue;

      const sku = String(row[0] || "").trim();
      const name = String(row[1] || "").trim();
      const colorTalle = String(row[2] || "").trim();
      const priceStr = String(row[3] || "").trim();

      if (!sku || !name) continue;

      const price = parseFloat(priceStr) || 0;

      products.push({
        marca: currentMarca,
        categoria: currentCategoria,
        subcategoria: currentSubcategoria,
        sku,
        name,
        colorTalle,
        price,
      });
    }

    return products;
  },

  parseColorTalle(
    colorTalle: string,
  ): Array<{ color: ColorProducto | undefined; talle: number | undefined }> {
    const result: Array<{
      color: ColorProducto | undefined;
      talle: number | undefined;
    }> = [];

    const normalized = colorTalle.toLowerCase().trim();

    if (!normalized) return result;

    const talleMatch = normalized.match(/(\d+)$/);
    const talle = talleMatch ? parseInt(talleMatch[1], 10) : undefined;

    const colorPart = normalized.replace(/\d+$/, "").trim();

    const colorCodes = colorPart.split(/[-/]/).filter(Boolean);

    for (const code of colorCodes) {
      const cleanCode = code.trim().toLowerCase();
      if (COLOR_LETTER_MAP[cleanCode]) {
        result.push({
          color: COLOR_LETTER_MAP[cleanCode],
          talle,
        });
      }
    }

    if (result.length === 0 && talle) {
      result.push({
        color: undefined,
        talle,
      });
    }

    return result;
  },
};
