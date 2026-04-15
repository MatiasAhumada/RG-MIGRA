import { NextResponse, type NextRequest } from "next/server";
import { marcaService } from "@/server/services/marca.service";
import {
  apiErrorHandler,
  type ApiError,
} from "@/utils/handlers/apiError.handler";

export async function GET(request: NextRequest) {
  try {
    const empresaId = request.nextUrl.searchParams.get("empresaId");

    const marcas = await marcaService.findAll(
      empresaId ? Number(empresaId) : undefined,
    );

    return NextResponse.json(marcas);
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
