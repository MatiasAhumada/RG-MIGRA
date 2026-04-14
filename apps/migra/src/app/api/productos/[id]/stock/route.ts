import { NextResponse, type NextRequest } from "next/server";
import { productoService } from "@/server/services/producto.service";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const id = Number(params.id);

    await productoService.toggleSinStock(id);

    return NextResponse.json({ message: "Estado de stock actualizado" });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
