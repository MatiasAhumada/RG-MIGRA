import { NextResponse, type NextRequest } from "next/server";
import { categoriaService } from "@/server/services/categoria.service";
import { apiErrorHandler, type ApiError } from "@/utils/handlers/apiError.handler";

export async function GET(request: NextRequest) {
  try {
    const empresaId = request.nextUrl.searchParams.get("empresaId");

    const categorias = await categoriaService.findAll(
      empresaId ? Number(empresaId) : undefined
    );

    return NextResponse.json(categorias);
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
