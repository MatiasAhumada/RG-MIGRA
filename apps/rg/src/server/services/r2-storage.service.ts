import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { CONFIG } from "@/constants/config.constant";
import { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";
import sharp from "sharp";

const s3Client = new S3Client({
  region: "auto",
  endpoint: CONFIG.R2_ENDPOINT,
  credentials: {
    accessKeyId: CONFIG.R2_ACCESS_KEY_ID || "",
    secretAccessKey: CONFIG.R2_SECRET_ACCESS_KEY || "",
  },
});

interface UploadImageResult {
  url: string;
  key: string;
}

export const r2StorageService = {
  async optimizeImage(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer).webp({ quality: 85, effort: 6 }).toBuffer();
  },

  async uploadImage(file: Buffer, key: string): Promise<UploadImageResult> {
    if (!CONFIG.R2_BUCKET_NAME) {
      throw new ApiError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Configuración de almacenamiento no disponible",
      });
    }

    try {
      const optimizedBuffer = await this.optimizeImage(file);

      await s3Client.send(
        new PutObjectCommand({
          Bucket: CONFIG.R2_BUCKET_NAME,
          Key: key,
          Body: optimizedBuffer,
          ContentType: "image/webp",
        }),
      );

      const url = `${CONFIG.R2_PUBLIC_URL}/${key}`;

      return { url, key };
    } catch (error) {
      throw new ApiError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Error al subir la imagen",
      });
    }
  },

  async deleteImage(key: string): Promise<void> {
    if (!CONFIG.R2_BUCKET_NAME) {
      throw new ApiError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Configuración de almacenamiento no disponible",
      });
    }

    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: CONFIG.R2_BUCKET_NAME,
          Key: key,
        }),
      );
    } catch (error) {
      throw new ApiError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Error al eliminar la imagen",
      });
    }
  },

  extractKeyFromUrl(url: string): string {
    if (!CONFIG.R2_PUBLIC_URL) {
      return "";
    }

    return url.replace(`${CONFIG.R2_PUBLIC_URL}/`, "");
  },

  generateProductKey(id: number, sku: string): string {
    return `productos/${id}-${sku}.webp`;
  },
};
