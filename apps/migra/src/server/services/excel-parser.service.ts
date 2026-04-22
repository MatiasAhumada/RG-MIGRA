import * as XLSX from "xlsx";
import { COLOR_LETTER_MAP } from "@/constants/producto.constant";
import { ColorProducto } from "@prisma/client";
import { ParsedProductExcel } from "@/types/producto.types";

const isNumeric = (val: string): boolean => {
  if (!val) return false;
  const hasCurrency = val.includes("$");
  const hasDecimalSeparators = val.includes(",") || val.includes(".");
  const cleaned = val.replace(/[^0-9.,]/g, "");

  if (!cleaned || !/[0-9]/.test(cleaned)) return false;

  if (hasCurrency || hasDecimalSeparators) return true;

  const num = parseFloat(cleaned);
  return !isNaN(num) && num > 100;
};

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

      const products = this.parseSheet(jsonData);
      allProducts.push(...products);
    }

    return allProducts;
  },

  parseSheet(jsonData: string[][]): ParsedProductExcel[] {
    const products: ParsedProductExcel[] = [];

    let currentMarca = "";
    let currentCategoria = "";
    let currentSubcategoria: string | null = null;
    let afterHeaders = false;

    for (let i = 0; i < jsonData.length; i++) {
      const row = jsonData[i];

      if (!row || row.length === 0) {
        continue;
      }

      const firstCell = String(row[0] || "").trim();

      if (firstCell === "SUBCATEGORIA") {
        afterHeaders = true;
        continue;
      }

      if (!firstCell) {
        if (!currentMarca || !currentCategoria) {
          continue;
        }

        if (afterHeaders && currentSubcategoria === null) {
          currentSubcategoria = "";
        }

        if (currentSubcategoria === null) {
          continue;
        }

        const sku = String(row[1] || "").trim();
        const name = String(row[2] || "").trim();
        const col3 = String(row[3] || "").trim();
        const col4 = String(row[4] || "").trim();
        const col5 = String(row[5] || "").trim();

        if (!sku || !name) {
          continue;
        }

        let color = "";
        let talle = "";
        let priceStr = "";

        if (col5 && isNumeric(col5)) {
          color = col3;
          talle = col4;
          priceStr = col5;
        } else if (col4 && isNumeric(col4)) {
          if (isNumeric(col3)) {
            priceStr = col3;
          } else {
            color = col3;
            priceStr = col4;
          }
        } else if (col3 && isNumeric(col3)) {
          priceStr = col3;
        }

        const price = parsePrice(priceStr);
        const colorTalle = [color, talle].filter(Boolean).join("-");

        products.push({
          marca: currentMarca,
          categoria: currentCategoria,
          subcategoria: currentSubcategoria || null,
          sku,
          name,
          colorTalle,
          price,
        });

        continue;
      }

      if (firstCell === "CATEGORIA") {
        const nextRow = jsonData[i + 1];
        if (nextRow && nextRow[0]) {
          currentCategoria = String(nextRow[0]).trim().toUpperCase();
          currentSubcategoria = null;
          afterHeaders = false;
        }
        i++;
        continue;
      }

      if (firstCell.startsWith("*")) {
        const hasSku = row[1] && String(row[1]).trim();
        const hasName = row[2] && String(row[2]).trim();

        if (!hasSku || !hasName || hasSku === "SKU" || hasName === "NOMBRE") {
          currentSubcategoria = firstCell.substring(1).trim().toUpperCase();
          continue;
        }

        currentSubcategoria = firstCell.substring(1).trim().toUpperCase();

        const sku = String(row[1]).trim();
        const name = String(row[2]).trim();
        const col3 = String(row[3] || "").trim();
        const col4 = String(row[4] || "").trim();
        const col5 = String(row[5] || "").trim();

        if (!currentMarca || !currentCategoria) {
          continue;
        }

        let color = "";
        let talle = "";
        let priceStr = "";

        if (col5 && isNumeric(col5)) {
          color = col3;
          talle = col4;
          priceStr = col5;
        } else if (col4 && isNumeric(col4)) {
          if (isNumeric(col3)) {
            priceStr = col3;
          } else {
            color = col3;
            priceStr = col4;
          }
        } else if (col3 && isNumeric(col3)) {
          priceStr = col3;
        }

        const price = parsePrice(priceStr);
        const colorTalle = [color, talle].filter(Boolean).join("-");

        products.push({
          marca: currentMarca,
          categoria: currentCategoria,
          subcategoria: currentSubcategoria,
          sku,
          name,
          colorTalle,
          price,
        });

        continue;
      }

      if (!currentCategoria) {
        currentMarca = firstCell.toUpperCase();
        continue;
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

    const normalized = colorTalle.toLowerCase().trim();

    if (!normalized) return result;

    let colorPart = normalized;
    let talle: number | undefined = undefined;

    if (normalized.includes("talle")) {
      const parts = normalized.split(/talle\s*/);
      colorPart = parts[0].trim();
      const talleStr = parts[1]?.trim();
      if (talleStr) {
        talle = parseInt(talleStr, 10);
      }
    }

    colorPart = colorPart.replace(/-$/, "").trim();

    const colorCodes = colorPart.split("-").filter(Boolean);

    if (colorCodes.length > 0) {
      for (const code of colorCodes) {
        const cleanCode = code.trim().toLowerCase();
        if (COLOR_LETTER_MAP[cleanCode]) {
          result.push({
            color: COLOR_LETTER_MAP[cleanCode],
            talle,
          });
        }
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
