import * as XLSX from "xlsx";
import { COLOR_LETTER_MAP } from "@/constants/producto.constant";
import { ColorProducto } from "@prisma/client";
import { ParsedProductExcel } from "@/types/producto.types";

const parsePrice = (val: string): number => {
  if (!val) return 0;
  let cleaned = val.replace(/[^0-9.,]/g, "");

  if (cleaned.includes(",") && cleaned.includes(".")) {
    if (cleaned.lastIndexOf(".") > cleaned.lastIndexOf(",")) {
      cleaned = cleaned.replace(/,/g, "");
    } else {
      cleaned = cleaned.replace(/\./g, "").replace(",", ".");
    }
  } else if (cleaned.includes(",")) {
    cleaned = cleaned.replace(",", ".");
  }

  return parseFloat(cleaned) || 0;
};

export const excelParserService = {
  async parseProductCatalog(buffer: Buffer): Promise<ParsedProductExcel[]> {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const allProducts: ParsedProductExcel[] = [];

    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as string[][];

      const products = this.parseSheet(jsonData, sheetName);
      allProducts.push(...products);
    }

    return allProducts;
  },

  parseSheet(jsonData: string[][], sheetName: string): ParsedProductExcel[] {
    const products: ParsedProductExcel[] = [];

    let currentMarca = "";
    let currentCategoria = "";
    let currentSubcategoria: string | null = null;

    for (let i = 0; i < jsonData.length; i++) {
      const row = jsonData[i];

      if (!row || row.length === 0) continue;

      const firstCell = String(row[0] || "").trim();

      if (firstCell === "SUBCATEGORIA") continue;

      if (firstCell === "CATEGORIA") {
        const nextRow = jsonData[i + 1];
        if (nextRow && nextRow[0]) {
          currentCategoria = String(nextRow[0]).trim().toUpperCase();
          currentSubcategoria = null;
        }
        i += 2;
        continue;
      }

      const sku = String(row[1] || "").trim();

      if (firstCell.startsWith("*") && !sku) {
        currentSubcategoria = firstCell.substring(1).trim().toUpperCase();
        continue;
      }

      if (!currentCategoria && firstCell) {
        currentMarca = firstCell.toUpperCase();
        continue;
      }

      if (currentMarca && currentCategoria) {
        let subcategoriaCell = firstCell;
        const name = String(row[2] || "").trim();
        const color = String(row[3] || "").trim();
        const talle = String(row[4] || "").trim();
        const priceStr = String(row[5] || "").trim();

        if (subcategoriaCell.startsWith("*")) {
          const extractedSubcat = subcategoriaCell
            .substring(1)
            .trim()
            .toUpperCase();
          if (extractedSubcat) {
            currentSubcategoria = extractedSubcat;
          }
        }

        if (!sku && !name && !color && !talle && !priceStr) {
          continue;
        }

        if (!sku || !name) {
          continue;
        }

        const price = parsePrice(priceStr);

        let colorTalle = "";
        if (color && talle) {
          const talleNum = talle.toLowerCase().replace(/[^0-9]/g, "");
          colorTalle = talleNum ? `${color}-talle ${talleNum}` : color;
        } else if (color) {
          colorTalle = color;
        } else if (talle) {
          colorTalle = talle;
        }

        products.push({
          marca: currentMarca,
          categoria: currentCategoria,
          subcategoria: currentSubcategoria || null,
          sku,
          name,
          colorTalle,
          price,
        });
      }
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

    if (!colorTalle) return result;

    const normalized = colorTalle.toLowerCase().trim();
    if (!normalized) return result;

    let talle: number | undefined = undefined;
    let colorPart = normalized;

    const talleMatch = normalized.match(/talle\s*(\d+)/);
    if (talleMatch) {
      talle = parseInt(talleMatch[1], 10);
      colorPart = normalized.replace(/talle\s*\d+/, "").trim();
      colorPart = colorPart.replace(/-+$/, "").trim();
    }

    if (colorPart === "s/col" || !colorPart) {
      if (talle) {
        result.push({ color: undefined, talle });
      }
      return result;
    }

    const colorCodes = colorPart
      .split("-")
      .map((c) => c.trim())
      .filter(Boolean);

    if (colorCodes.length === 0) {
      if (talle) {
        result.push({ color: undefined, talle });
      }
      return result;
    }

    for (const code of colorCodes) {
      const normalizedCode = code.toLowerCase();
      if (COLOR_LETTER_MAP[normalizedCode]) {
        result.push({
          color: COLOR_LETTER_MAP[normalizedCode],
          talle,
        });
      } else if (COLOR_LETTER_MAP[code]) {
        result.push({
          color: COLOR_LETTER_MAP[code],
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
