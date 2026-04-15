import { NextRequest, NextResponse } from "next/server";
import { productoVarianteService } from "@/server/services/producto-variante.service";
import { apiErrorHandler } from "@/utils/handlers/apiError.handler";
import { httpStatus } from "@/constants/http-status.constant";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productoId = searchParams.get("productoId");

    const variantes = await productoVarianteService.findAll(
      productoId ? Number(productoId) : undefined,
    );

    return NextResponse.json(variantes, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const variante = await productoVarianteService.create(body);

    return NextResponse.json(variante, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
