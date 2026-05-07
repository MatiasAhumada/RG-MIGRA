import { NextRequest, NextResponse } from "next/server";
import { productoService } from "@/server/services/producto.service";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import { IMAGE_UPLOAD_CONFIG, IMAGE_UPLOAD_MESSAGES } from "@/constants/image-upload.constant";
import httpStatus from "http-status";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      throw new ApiError({
        status: httpStatus.BAD_REQUEST,
        message: "No se enviaron imágenes",
      });
    }

    const images = await Promise.all(
      files.map(async (file) => {
        const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
        
        if (!IMAGE_UPLOAD_CONFIG.SUPPORTED_EXTENSIONS.includes(fileExtension)) {
          throw new ApiError({
            status: httpStatus.BAD_REQUEST,
            message: `${IMAGE_UPLOAD_MESSAGES.UNSUPPORTED_FORMAT}: ${file.name}`,
          });
        }

        if (file.size > IMAGE_UPLOAD_CONFIG.MAX_FILE_SIZE) {
          throw new ApiError({
            status: httpStatus.BAD_REQUEST,
            message: `${IMAGE_UPLOAD_MESSAGES.FILE_TOO_LARGE}: ${file.name}`,
          });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = file.name;
        const sku = fileName.split(".")[0];

        return {
          sku,
          file: buffer,
          fileName,
        };
      }),
    );

    const result = await productoService.bulkUploadImages({ images });

    return NextResponse.json(result, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
