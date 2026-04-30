import { productoRepository } from "@/server/repository/producto.repository";
import { productoVarianteRepository } from "@/server/repository/producto-variante.repository";
import { r2StorageService } from "@/server/services/r2-storage.service";
import { pdfParserService } from "@/server/services/pdf-parser.service";
import { excelParserService } from "@/server/services/excel-parser.service";
import { marcaService } from "@/server/services/marca.service";
import { categoriaService } from "@/server/services/categoria.service";
import { subcategoriaService } from "@/server/services/subcategoria.service";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import { COLOR_LETTER_MAP } from "@/constants/producto.constant";
import httpStatus from "http-status";
import {
  CreateProductoDto,
  UpdateProductoDto,
  BulkCreateProductoDto,
  BulkUploadImagesDto,
  BulkUploadImagesResult,
} from "@/types/producto.types";

export const productoService = {
  async create(dto: CreateProductoDto) {
    const existingSku = await productoRepository.findBySku(dto.sku);

    if (existingSku) {
      throw new ApiError({
        status: httpStatus.CONFLICT,
        message: ERROR_MESSAGES.PRODUCTO_SKU_EXISTS,
      });
    }

    const { variantes, ...productoData } = dto;
    const producto = await productoRepository.create(productoData);

    if (variantes && variantes.length > 0) {
      for (const variante of variantes) {
        await productoVarianteRepository.create({
          ...variante,
          productoId: producto.id,
        });
      }
    }

    return productoRepository.findById(producto.id);
  },

  async findById(id: number) {
    const producto = await productoRepository.findById(id);

    if (!producto) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.PRODUCTO_NOT_FOUND,
      });
    }

    return producto;
  },

  async findByEmpresaId(empresaId: number) {
    return productoRepository.findByEmpresaId(empresaId);
  },

  async findByMarca(marcaId: number, empresaId: number) {
    return productoRepository.findByMarca(marcaId, empresaId);
  },

  async findByCategoria(categoriaId: number, empresaId: number) {
    return productoRepository.findByCategoria(categoriaId, empresaId);
  },

  async findBySubcategoria(subcategoriaId: number, empresaId: number) {
    return productoRepository.findBySubcategoria(subcategoriaId, empresaId);
  },

  async update(id: number, dto: UpdateProductoDto) {
    await this.findById(id);

    if (dto.sku) {
      const existingSku = await productoRepository.findBySku(dto.sku);

      if (existingSku && existingSku.id !== id) {
        throw new ApiError({
          status: httpStatus.CONFLICT,
          message: ERROR_MESSAGES.PRODUCTO_SKU_EXISTS,
        });
      }
    }

    return productoRepository.update(id, dto);
  },

  async updateImage(id: number, imageBase64: string) {
    const producto = await this.findById(id);

    if (producto.imgUrl) {
      await r2StorageService.deleteImageBySku(producto.sku);
    }

    const buffer = Buffer.from(imageBase64, "base64");
    const key = r2StorageService.generateProductKey(producto.sku);
    const { url } = await r2StorageService.uploadImage(buffer, key);

    return productoRepository.update(id, { imgUrl: url });
  },

  async delete(id: number) {
    const producto = await this.findById(id);

    if (producto.imgUrl) {
      await r2StorageService.deleteImageBySku(producto.sku);
    }

    return productoRepository.softDelete(id);
  },

  async restore(id: number) {
    const producto = await productoRepository.findByIdIncludingDeleted(id);

    if (!producto) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.PRODUCTO_NOT_FOUND,
      });
    }

    return productoRepository.restore(id);
  },

  async findAll(
    search?: string,
    empresaId?: number,
    marcaId?: number,
    categoriaId?: number,
    subcategoriaId?: number,
    page?: number,
    limit?: number,
  ) {
    return productoRepository.findAll(
      search,
      empresaId,
      marcaId,
      categoriaId,
      subcategoriaId,
      page,
      limit,
    );
  },

  async findAllActive(
    search?: string,
    empresaId?: number,
    categoriaId?: number,
  ) {
    return productoRepository.findAllActive(search, empresaId, categoriaId);
  },

  async toggleSinStock(id: number) {
    const producto = await this.findById(id);

    return productoRepository.update(id, { sinStock: !producto.sinStock });
  },

  async bulkCreateFromPdf(dto: BulkCreateProductoDto) {
    if (!dto.pdfBuffer) {
      throw new ApiError({
        status: httpStatus.BAD_REQUEST,
        message: "pdfBuffer es requerido para carga masiva desde PDF",
      });
    }

    const parsedProducts = await pdfParserService.parseProductCatalog(
      dto.pdfBuffer,
    );

    const created = [];
    const errors = [];

    for (const parsed of parsedProducts) {
      try {
        const existing = await productoRepository.findBySku(parsed.sku);

        if (existing) {
          errors.push({
            sku: parsed.sku,
            error: ERROR_MESSAGES.PRODUCTO_SKU_EXISTS,
          });
          continue;
        }

        const producto = await productoRepository.create({
          sku: parsed.sku,
          name: parsed.name,
          price: dto.defaultPrice,
          empresaId: dto.empresaId,
          categoriaId: dto.categoriaId,
          subcategoriaId: dto.subcategoriaId,
          marcaId: dto.marcaId,
        });

        created.push(producto);
      } catch (error) {
        errors.push({ sku: parsed.sku, error: (error as Error).message });
      }
    }

    return { created, errors, total: parsedProducts.length };
  },

  async bulkCreateFromExcel(dto: BulkCreateProductoDto) {
    const parsedProducts = await excelParserService.parseProductCatalog(
      dto.excelBuffer!,
    );

    const created = [];
    const errors = [];
    const updated = [];
    const empresaId = dto.empresaId;

    for (const parsed of parsedProducts) {
      try {
        const marca = await marcaService.findByName(parsed.marca, empresaId);
        const categoria = await categoriaService.findByName(
          parsed.categoria,
          empresaId,
          marca.id,
        );
        const subcategoria = parsed.subcategoria
          ? await subcategoriaService.findByName(
              parsed.subcategoria,
              categoria.id,
              empresaId,
            )
          : null;

        const existing = await productoRepository.findBySku(parsed.sku);

        let producto;

        if (existing) {
          await productoVarianteRepository.deleteAllByProductoId(existing.id);

          producto = await productoRepository.update(existing.id, {
            name: parsed.name,
            price: parsed.price,
            categoriaId: categoria.id,
            subcategoriaId: subcategoria?.id,
            marcaId: marca.id,
          });
          updated.push(producto);
        } else {
          producto = await productoRepository.create({
            sku: parsed.sku,
            name: parsed.name,
            price: parsed.price,
            empresaId,
            categoriaId: categoria.id,
            subcategoriaId: subcategoria?.id,
            marcaId: marca.id,
          });
          created.push(producto);
        }

        if (parsed.colorTalle) {
          const variantesData = excelParserService.parseColorTalle(
            parsed.colorTalle,
          );

          for (const vd of variantesData) {
            if (vd.color || vd.talle) {
              const existingVariante =
                await productoVarianteRepository.findByColorAndTalleIfExists(
                  producto.id,
                  vd.color,
                  vd.talle,
                );

              if (!existingVariante) {
                await productoVarianteRepository.create({
                  color: vd.color,
                  talle: vd.talle,
                  productoId: producto.id,
                });
              }
            }
          }
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        console.error(
          `Error procesando producto SKU ${parsed.sku} (${parsed.name}):`,
          errorMessage,
        );
        errors.push({
          sku: parsed.sku,
          name: parsed.name,
          error: errorMessage,
        });
      }
    }

    return {
      created: created.length,
      updated: updated.length,
      errors,
      total: parsedProducts.length,
    };
  },

  async bulkUploadImages(
    dto: BulkUploadImagesDto,
  ): Promise<BulkUploadImagesResult> {
    const results: BulkUploadImagesResult["results"] = [];
    let success = 0;
    let failed = 0;

    const validations: Array<{
      image: (typeof dto.images)[0];
      producto: Awaited<ReturnType<typeof productoRepository.findBySku>>;
      variante?: Awaited<
        ReturnType<typeof productoVarianteRepository.findByColor>
      >;
      sku: string;
      colorLetter?: string;
      error?: string;
    }> = [];

    for (const image of dto.images) {
      const fileNameWithoutExt = image.fileName.replace(/\.[^/.]+$/, "");
      const parts = fileNameWithoutExt.split(/[\s-]+/).filter(Boolean);
      const sku = parts[0];
      const colorLetter = parts[1];

      const producto = await productoRepository.findBySku(sku);

      if (!producto) {
        validations.push({
          image,
          producto: null as never,
          sku: fileNameWithoutExt,
          error: `${ERROR_MESSAGES.PRODUCTO_NOT_FOUND} (SKU: ${sku})`,
        });
        continue;
      }

      if (colorLetter && COLOR_LETTER_MAP[colorLetter]) {
        const color = COLOR_LETTER_MAP[colorLetter];
        const variante = await productoVarianteRepository.findByColor(
          producto.id,
          color,
        );

        if (!variante) {
          validations.push({
            image,
            producto,
            sku: fileNameWithoutExt,
            colorLetter,
            error: `Variante con color ${colorLetter} no encontrada`,
          });
          continue;
        }

        validations.push({
          image,
          producto,
          variante,
          sku: fileNameWithoutExt,
          colorLetter,
        });
      } else {
        validations.push({
          image,
          producto,
          sku: fileNameWithoutExt,
        });
      }
    }

    for (const validation of validations) {
      if (validation.error) {
        results.push({
          sku: validation.sku,
          success: false,
          error: validation.error,
        });
        failed++;
        continue;
      }

      try {
        const { image, producto, variante, sku, colorLetter } = validation;

        if (!producto) {
          throw new Error(ERROR_MESSAGES.PRODUCTO_NOT_FOUND);
        }

        let url: string;

        if (colorLetter && variante) {
          const key = r2StorageService.generateProductKey(
            producto.sku,
            colorLetter.toLowerCase(),
          );

          if (variante.imgUrl) {
            const uploadResult = await r2StorageService.replaceImage(
              image.file,
              variante.imgUrl,
              key,
            );
            url = uploadResult.url;
          } else {
            const uploadResult = await r2StorageService.uploadImage(
              image.file,
              key,
            );
            url = uploadResult.url;
          }

          await productoVarianteRepository.updateImage(variante.id, url);
        } else {
          const key = r2StorageService.generateProductKey(producto.sku);

          if (producto.imgUrl) {
            const uploadResult = await r2StorageService.replaceImage(
              image.file,
              producto.imgUrl,
              key,
            );
            url = uploadResult.url;
          } else {
            const uploadResult = await r2StorageService.uploadImage(
              image.file,
              key,
            );
            url = uploadResult.url;
          }

          await productoRepository.update(producto.id, { imgUrl: url });
        }

        results.push({
          sku,
          success: true,
          url,
        });
        success++;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : ERROR_MESSAGES.IMAGE_UPLOAD_FAILED;

        results.push({
          sku: validation.sku,
          success: false,
          error: errorMessage,
        });
        failed++;

        console.error(
          `Error uploading ${validation.image.fileName}:`,
          errorMessage,
        );
      }
    }

    return { success, failed, results };
  },
};
