import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { CONFIG } from "@/constants/config.constant";
import { IMAGE_UPLOAD_CONFIG } from "@/constants/image-upload.constant";
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
  isWebP(buffer: Buffer): boolean {
    return (
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46
    );
  },

  async optimizeImage(buffer: Buffer): Promise<Buffer> {
    if (this.isWebP(buffer)) {
      return buffer;
    }
    return sharp(buffer)
      .webp({
        quality: IMAGE_UPLOAD_CONFIG.QUALITY,
        effort: IMAGE_UPLOAD_CONFIG.EFFORT,
      })
      .toBuffer();
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

  async replaceImage(
    file: Buffer,
    oldUrl: string,
    newKey: string,
  ): Promise<UploadImageResult> {
    const oldKey = this.extractKeyFromUrl(oldUrl);

    if (oldKey && oldKey !== newKey) {
      try {
        await this.deleteImage(oldKey);
      } catch (error) {
        // Ignore deletion errors
      }
    }

    return this.uploadImage(file, newKey);
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

  generateProductKey(sku: string, colorLetter?: string): string {
    const baseKey = colorLetter ? `${sku}-${colorLetter}` : sku;
    return `productos/${baseKey}.webp`;
  },

  async deleteImageBySku(sku: string, colorLetter?: string): Promise<void> {
    const key = this.generateProductKey(sku, colorLetter);
    await this.deleteImage(key);
  },
};
