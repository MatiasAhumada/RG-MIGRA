import { NextRequest, NextResponse } from "next/server";
import { productoVarianteService } from "@/server/services/producto-variante.service";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const variante = await productoVarianteService.findById(Number(id));

    return NextResponse.json(variante, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const contentType = request.headers.get("content-type");

    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      const imageFile = formData.get("image") as File | null;

      if (!imageFile) {
        throw new ApiError({
          status: httpStatus.BAD_REQUEST,
          message: "No se proporcionó ninguna imagen",
        });
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = buffer.toString("base64");
      const variante = await productoVarianteService.updateImage(
        Number(id),
        base64,
      );
      return NextResponse.json(
        { url: variante.imgUrl },
        { status: httpStatus.OK },
      );
    }

    const body = await request.json();
    const variante = await productoVarianteService.update(Number(id), body);

    return NextResponse.json(variante, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await productoVarianteService.delete(Number(id));

    return NextResponse.json(
      { message: "Variante eliminada" },
      { status: httpStatus.OK },
    );
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
